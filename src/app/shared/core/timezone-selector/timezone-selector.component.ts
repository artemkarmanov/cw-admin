import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {combineLatest, startWith} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {
	AbstractControl,
	ControlValueAccessor,
	FormBuilder,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	Validators
} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {timezones} from "@constants/timezones";

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
			useExisting: TimezoneSelectorComponent,
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useValue: Validators.pattern(new RegExp(/^((?!null).)*$/)),
			multi: true
		},
	]
})
export class TimezoneSelectorComponent implements OnInit, ControlValueAccessor {
	public timezones = timezones
	public timeZoneForm = this.fb.group({
		region: ['', [Validators.required]],
		city: ['', [Validators.required]]
	})

	constructor(private fb: FormBuilder) {
	}

	get regionControl(): AbstractControl {
		return this.timeZoneForm.controls['region']
	}

	get cityControl(): AbstractControl {
		return this.timeZoneForm.controls['city']
	}

	ngOnInit() {
		combineLatest([
			this.regionControl.valueChanges
				.pipe(
					untilDestroyed(this),
					tap(() => this.cityControl.reset()),
					startWith(this.regionControl.value)
				),
			this.cityControl.valueChanges
				.pipe(
					untilDestroyed(this)
				)
		])
			.pipe(
				untilDestroyed(this),
				map(([region, city]) => `${region.region}/${city}`),
			)
			.subscribe((timezone) => this.onChange(timezone))
	}

	writeValue(timezone: string): void {
		if (!timezone) return
		const timezoneSplit = timezone.split('/')
		const writtenRegion = this.timezones
			.find((region) => region.region === timezoneSplit[0])

		this.timeZoneForm.setValue({
			region: writtenRegion,
			city: timezoneSplit[1]
		})

		this.onChange(timezone)
	}

	registerOnChange(fn: (timezone: string) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	markAsTouched(): void {
		this.onTouched();
	}

	private onChange = (_: string) => {
	};

	private onTouched = () => {
	}
}
