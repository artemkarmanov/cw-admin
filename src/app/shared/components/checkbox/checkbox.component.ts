import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CheckboxProvider } from './checkbox.provider';

@Component({
  selector: 'cw-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: CheckboxProvider(CheckboxComponent),
})
export class CheckboxComponent implements ControlValueAccessor {
  public value = false;
  constructor() {}

  onChange: any = () => {};

  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  onModelChange(value: boolean): void {
    this.value = value;
    this.onChange(value);
  }
}
