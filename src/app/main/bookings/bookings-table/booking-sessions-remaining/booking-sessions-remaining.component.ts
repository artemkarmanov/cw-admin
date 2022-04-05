import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {ViewCell} from "ng2-smart-table";
import {IBookingSummary} from "@interfaces/booking.interfaces";

@Component({
  selector: 'cwb-booking-sessions-remaining',
  templateUrl: './booking-sessions-remaining.component.html',
  styleUrls: ['./booking-sessions-remaining.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingSessionsRemainingComponent implements ViewCell {
  @Input() public value!: number
  @Input() public rowData!: IBookingSummary
}
