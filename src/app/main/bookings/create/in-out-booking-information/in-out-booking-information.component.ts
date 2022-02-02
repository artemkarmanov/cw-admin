import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cwb-in-out-booking-information',
  templateUrl: './in-out-booking-information.component.html',
  styleUrls: ['./in-out-booking-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InOutBookingInformationComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
