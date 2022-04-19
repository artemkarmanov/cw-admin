import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {IBooking} from "@interfaces/booking.interfaces";
import {Select} from "@ngxs/store";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";
import {BookingsState} from "@store/bookings.state";
import {SessionsService} from "../../sessions/sessions.service";

@Component({
    selector: 'cwb-booking-page',
    templateUrl: './view-booking-page.component.html',
    styleUrls: ['./view-booking-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewBookingPageComponent implements OnInit {
    @Select(BookingsState.booking) booking$!: Observable<IBooking>

    constructor(
        private route: ActivatedRoute,
        private sessionsService: SessionsService
    ) {
    }

    ngOnInit() {
        this.getBooking()
    }

    @Dispatch()
    getBooking() {
        return new Send({
            type: MessageType.GetBookings,
            data: {bookingToken: this.route.snapshot.params['booking_id']}
        })
    }

    addSession() {
        this.sessionsService.add$()
    }
}
