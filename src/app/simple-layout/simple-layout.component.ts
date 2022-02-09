import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cwb-simple-layout',
  templateUrl: './simple-layout.component.html',
  styleUrls: ['./simple-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleLayoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
