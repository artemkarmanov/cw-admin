import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms"
import {DateTime} from "luxon";

export interface IRangePicker {
  startDate: string
  endDate: string
}

export interface IDateRange {
  start: number
  end: number
}

@Component({
  selector: 'cwb-range-picker',
  templateUrl: './range-picker.component.html',
  styleUrls: ['./range-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RangePickerComponent),
    multi: true,
  }],
  encapsulation: ViewEncapsulation.None
})
export class RangePickerComponent implements ControlValueAccessor, OnInit {
  @Output() public picked = new EventEmitter<IDateRange>()
  public value!: IRangePicker
  public disabled: boolean = false
  public locale = {
    displayFormat: 'DD MMM YYYY',
    daysOfWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  }

  private static formatDate(stringDate: string | undefined): string | undefined {
    return stringDate
        ? DateTime
            .fromMillis(Number(new Date(stringDate)))
            .toFormat('dd MMM yyyy')
        : undefined
  }

  ngOnInit() {
    const key = localStorage.getItem('range')
    key && this.writeValue(JSON.parse(key))
  }

  public formatValue(): string {
    const start = RangePickerComponent.formatDate(this.value?.startDate)
    const end = RangePickerComponent.formatDate(this.value?.endDate)
    return start && end
        ? `${start} - ${end}`
        : ''
  }

  writeValue(obj: Object) {
    if (!obj) return

    this.value = obj as IRangePicker

    localStorage.setItem('range', JSON.stringify(obj))

    this.picked.emit({
      start: Number(new Date(this.value.startDate)),
      end: Number(new Date(this.value.endDate))
    })
  }

  registerOnChange(fn: any) {
    this.onChange(fn)
  }

  registerOnTouched() {
    this.onTouched()
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled
  }

  private onChange = (_: any) => {
  }

  private onTouched = () => {
  }
}
