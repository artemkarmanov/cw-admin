import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cwb-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateButtonComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
