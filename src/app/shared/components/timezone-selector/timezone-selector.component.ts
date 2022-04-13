import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {delayWhen, Observable, of, take} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {
	ControlValueAccessor,
	FormControl,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	Validators
} from '@angular/forms';
import {IRegion} from "@interfaces/user.interfaces";
import {TimezoneService} from "@services/timezone.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Select} from "@ngxs/store";
import {UserState} from "@store/user.state";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";

@UntilDestroy()
@Component({
	selector: 'cwb-timezone-selector',
	templateUrl: './timezone-selector.component.html',
	styleUrls: ['./timezone-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TimezoneSelectorComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => TimezoneSelectorComponent),
			multi: true
		}
	]
})
export class TimezoneSelectorComponent implements OnInit, ControlValueAccessor {
	public region: FormControl = new FormControl('', Validators.required);
	public city: FormControl = new FormControl('', Validators.required);
	public cities: string[] = []
	@Select(UserState.regions) public regions$!: Observable<IRegion[]>
	@Select(UserState.cities) public cities$!: Observable<string[]>
	@SelectSnapshot(UserState.regions) private regions!: IRegion[]
	private rValue: { region?: string, city?: string } = {}

	constructor(private timezoneService: TimezoneService) {
	}

	get value() {
		return `${this.rValue?.region}/${this.rValue?.city}`
	}

	ngOnInit() {
		this.region
			.valueChanges
			.pipe(untilDestroyed(this))
			.pipe(tap(() => this.city.reset()))
			.subscribe(({region}) => this.rValue = {region, city: ''})

		this.city
			.valueChanges
			.pipe(untilDestroyed(this))
			.subscribe((city) => this.rValue = {region: this.rValue!.region, city})

		this.timezoneService.getRegions$()
	}

	writeValue(timezone: string): void {
		if (!timezone) return

		if (timezone.includes('+')) {
			const scooped = timezone.replace('+', '').split('/')
			this.rValue = {region: scooped[0], city: scooped[1]}
		} else {
			of(timezone)
				.pipe(
					untilDestroyed(this),
					delayWhen(() => this.regions$),
					take(1),
					map((timezone) => {
						const region = this.regions!.find(el => el.region === timezone.split('/')[0])
						this.region.setValue(region || null)
						return {region: region!, city: timezone.split('/')[1]}
					}),
					tap(({city}) => this.city.setValue(city)),
					delayWhen(() => this.cities$),
				)
				.subscribe()
		}
	}

	onChange(value: IRegion | string): any {
		if (typeof value === "string") {
			this.rValue.city = value
		} else {
			this.city.reset()
			this.timezoneService.getCities$(value.regionId)
			this.rValue.region = value.region
		}
		this.onTouched()
	}

	registerOnChange(fn: any): void {
		this.registerOnTouched(fn)
		this.onChange = fn;
	}

	onTouched = () => {
	};

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	validate(): boolean {
		return Boolean(this.rValue?.region && this.rValue.city)
	}
}
