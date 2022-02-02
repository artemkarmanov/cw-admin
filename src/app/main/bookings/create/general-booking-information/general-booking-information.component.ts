import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cwb-general-booking-information',
  templateUrl: './general-booking-information.component.html',
  styleUrls: ['./general-booking-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralBookingInformationComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
