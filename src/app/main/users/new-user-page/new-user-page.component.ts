import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cwb-new-user-page',
  templateUrl: './new-user-page.component.html',
  styleUrls: ['./new-user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}