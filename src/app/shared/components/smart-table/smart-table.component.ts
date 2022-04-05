import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'cwb-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SmartTableComponent {
  @Input() public source: any[] = []
  @Input() public columns: any = {}
  @Input() public perPage: number = 0
  @Input() public displayPager: boolean = true
  @Output() public rowClicked = new EventEmitter()

  public loadData() {
  }
}
