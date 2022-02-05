import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cwb-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
