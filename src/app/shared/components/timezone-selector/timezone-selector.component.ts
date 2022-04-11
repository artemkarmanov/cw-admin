import {ChangeDetectionStrategy, Component, forwardRef, Input, OnInit} from '@angular/core';
import {combineLatest, delayWhen, distinctUntilChanged, Observable, of, take} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
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

@UntilDestroy()
@Component({
	selector: 'cwb-timezone-selector',
	templateUrl: './timezone-selector.component.html',
	styleUrls: ['./timezone-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
	private regions: IRegion[] = []
	public regions$: Observable<IRegion[]> = this.timezoneService.getRegions$()
		.pipe(
			tap(result => this.regions = result)
		);

	private _value: string | undefined;

	get value() {
		return this._value;
	}

	@Input()
	set value(val) {
		this._value = val;
	}

	constructor(private timezoneService: TimezoneService) {
	}

	public cities$(regionId: number): Observable<string[]> {
		return this.timezoneService.getCities$(regionId)
			.pipe(tap((result) => this.cities = result))
	}

	ngOnInit(): void {
		combineLatest([
			this.region.valueChanges,
			this.city.valueChanges
		])
			.pipe(
				untilDestroyed(this),
				filter(([region, city]: [IRegion, string]) => Boolean(region?.regionId && city)),
				distinctUntilChanged(([region, city], [region2, city2]) => region.regionId === region2.regionId && city === city2),
			)
			.subscribe(([region, city]) => this.writeValue(`${region.region}/${city}+`))
	}

	pickedCountry(region: IRegion) {
		this.cities$(region.regionId)
			.pipe(untilDestroyed(this))
			.subscribe()
		this.city.reset()
		this.value = undefined
	}

	pickedCity(_: string) {
		this.onTouched()
	}

	writeValue(timezone: string): void {
		// user picked
		if (!timezone) return

		if (timezone.includes('+')) {
			this.value = timezone.replace('+', '')
			// set by outside form
		} else {
			of(timezone).pipe(
				filter((timezone) => Boolean(timezone)),
				take(1),
				delayWhen(() => this.regions$),
				map((timezone) => {
					const region = this.regions!.find(el => el.region === timezone.split('/')[0])
					this.region.setValue(region || null)
					return {region: region!, city: timezone.split('/')[1]}
				}),
				delayWhen(({region}) => this.cities$(region.regionId)),
				tap(({city}) => this.city.setValue(city)),
				tap(({region, city}) => this.writeValue(region.region + '/' + city)),
			).subscribe()
		}
	}

	onChange(value: any): any {
		this.value = value
	}

	registerOnChange(fn: any): void {
		this.registerOnTouched(fn)
		this.onChange = fn;
	}

	onTouched = () => {};

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	validate(): boolean {
		return Boolean(this.region.value && this.city.value)
	}
}
