import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cwb-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
