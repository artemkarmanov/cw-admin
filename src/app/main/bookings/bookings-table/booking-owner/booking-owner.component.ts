import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {ViewCell} from "ng2-smart-table";
import {IBookingSummary} from "@interfaces/booking.interfaces";

@Component({
  selector: 'cwb-booking-owner',
  templateUrl: './booking-owner.component.html',
  styleUrls: ['./booking-owner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingOwnerComponent implements ViewCell {
  @Input() public value!: number
  @Input() public rowData!: IBookingSummary
}
