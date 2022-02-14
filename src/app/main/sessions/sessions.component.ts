import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cwb-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
