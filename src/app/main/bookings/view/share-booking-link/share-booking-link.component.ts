import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {environment} from '@env';
import {IBooking} from "@interfaces/booking.interfaces";

@Component({
    selector: 'cwb-share-booking-link',
    templateUrl: './share-booking-link.component.html',
    styleUrls: ['./share-booking-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareBookingLinkComponent implements OnInit {
    public href!: string;
    public copied: boolean = false

    constructor() {
    }

    @Input()
    set booking(booking: IBooking) {
        this.href = environment.viewerUrl +
          '?bookingToken=' + booking.bookingToken +
          ((booking.bookingPasscodeHash)
            ? '&bookingPasscodeHash=' + booking.bookingPasscodeHash
            : '');
    }

    ngOnInit(): void {
    }

    copy() {
        window.navigator.clipboard.writeText(this.href!).then()
        this.copied = true
    }
}
