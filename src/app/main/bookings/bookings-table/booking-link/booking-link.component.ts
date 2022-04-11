import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {ViewCell} from "ng2-smart-table";
import {IBooking} from "@interfaces/booking.interfaces";

@Component({
  selector: 'cwb-booking-link',
  templateUrl: './booking-link.component.html',
  styleUrls: ['booking-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingLinkComponent implements ViewCell {
  @Input() value!: number
  @Input() rowData!: IBooking
}
