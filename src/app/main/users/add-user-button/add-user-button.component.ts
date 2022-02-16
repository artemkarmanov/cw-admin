import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cwb-add-user-button',
  templateUrl: './add-user-button.component.html',
  styleUrls: ['./add-user-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserButtonComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
