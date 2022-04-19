import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BookingService} from './booking.service';
import {Observable} from 'rxjs';
import {IBookingSummary} from "@interfaces/booking.interfaces";
import {Title} from "@angular/platform-browser";
import {bookingsTableConfig} from "./bookings.table.config";
import {Select} from "@ngxs/store";
import {BookingsState} from "@store/bookings.state";

@Component({
    selector: 'cwb-bookings-page',
    templateUrl: './bookings-page.component.html',
    styleUrls: ['./bookings-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class BookingsPageComponent implements OnInit {
    @Select(BookingsState.bookings) public bookings$!: Observable<IBookingSummary[]>;
    public columnsConfig = bookingsTableConfig;

    constructor(
        private bookingService: BookingService,
        private titleService: Title
    ) {
    }

    ngOnInit(): void {
        this.titleService.setTitle('CaptionWorks | Bookings')
        this.bookingService.getBookings$()
    }

    reload() {
        this.bookingService.getBookings$()
    }
}
