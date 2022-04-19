import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, of, switchMap} from 'rxjs';
import {IBooking} from "@interfaces/booking.interfaces";
import {Select} from "@ngxs/store";
import {BookingsState} from "@store/bookings.state";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {SetBreadcrumbs} from "@store/breadcrumbs.actions";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'cwb-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent implements OnInit {
    @Select(BookingsState.booking) public booking$!: Observable<IBooking>

    constructor(private route: ActivatedRoute) {
    }

    @Dispatch()
    ngOnInit() {
        return this.route.params.pipe(
            switchMap(() => this.booking$),
            switchMap((booking: IBooking) => of(new SetBreadcrumbs([
                    {title: 'Bookings', path: '/bookings'},
                    {title: booking.title}
                ]))
            ))
    }
}
