import {Component, Input} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';

@Component({
  selector: 'cw-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}],
})
export class StepperComponent extends CdkStepper {
  @Input() public invalid!: boolean

  public selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
}
