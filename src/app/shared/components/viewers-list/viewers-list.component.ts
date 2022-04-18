import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
	Self
} from '@angular/core';
import {
	ControlValueAccessor,
	FormArray,
	FormBuilder,
	NgControl,
	Validators
} from '@angular/forms';
import {map, pluck, tap} from "rxjs/operators";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
	selector: 'cwb-viewers-list',
	templateUrl: './viewers-list.component.html',
	styleUrls: ['./viewers-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewersListComponent implements OnInit, ControlValueAccessor {
	public viewerForm = this.fb.group({
		viewers: this.fb.array([])
	})
	private onChange!: (value: string) => void;

	constructor(
		@Self() private readonly ngControl: NgControl,
		private readonly cdr: ChangeDetectorRef,
		private fb: FormBuilder
	) {
		this.ngControl.valueAccessor = this
	}

	get viewerArray(): FormArray {
		return this.viewerForm.get('viewers') as FormArray
	}

	public newViewer(email?: string) {
		return this.viewerArray
			.push(
				this.fb.control(
					email ?? '',
					[Validators.required, Validators.email]
				)
			)
	}

	public removeViewer(i: number) {
		return this.viewerArray.removeAt(i)
	}

	ngOnInit(): void {
		this.viewerForm
			.valueChanges
			.pipe(
				untilDestroyed(this),
				pluck('viewers'),
				map((viewers: string[]) => viewers.join('\n')),
				tap(this.onChange)
			)
			.subscribe()
	}

	writeValue(value: string | null): void {
		if (!value) return

		const userList = value.split('\n')

		userList.forEach((email) => {
			const newControl = this.fb.control(
				email,
				[Validators.email]
			)
			this.viewerArray.push(
				newControl,
				{emitEvent: false}
			)
		})
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	private onTouched = () => {
	}
}
