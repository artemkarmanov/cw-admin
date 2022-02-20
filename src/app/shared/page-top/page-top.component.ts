import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cwb-page-top',
  templateUrl: './page-top.component.html',
  styleUrls: ['./page-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTopComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
