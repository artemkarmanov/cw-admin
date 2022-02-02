import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cwb-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingDetailsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
