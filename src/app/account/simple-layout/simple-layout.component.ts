import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  templateUrl: './simple-layout.component.html',
  styleUrls: ['./simple-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleLayoutComponent {}
