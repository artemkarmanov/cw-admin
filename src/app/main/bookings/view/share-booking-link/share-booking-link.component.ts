import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IBooking} from '../../../../core/types';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'cwb-share-booking-link',
    templateUrl: './share-booking-link.component.html',
    styleUrls: ['./share-booking-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareBookingLinkComponent implements OnInit {
    public href!: string;

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

}
