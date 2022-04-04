import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'cwb-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  @Input() public text!: string | number
  @Input() public color!: 'blue' | 'orange' | 'green'
}
