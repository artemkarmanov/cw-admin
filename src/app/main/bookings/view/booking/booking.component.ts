import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ViewService} from '../view.service';
import {IBooking} from "@interfaces/booking.interfaces";

@Component({
    selector: 'cwb-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    public data$: Observable<IBooking> = this.viewService.currentBookingData$.pipe(
    )

    constructor(
        private viewService: ViewService
    ) {
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }


}
