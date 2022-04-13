import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {IBooking} from "@interfaces/booking.interfaces";
import {Select} from "@ngxs/store";
import {BookingsState} from "@store/bookings.state";

@Component({
    selector: 'cwb-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent {
    @Select(BookingsState.booking) public booking$!: Observable<IBooking>
}
