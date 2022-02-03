import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from './booking.service';
import {BehaviorSubject, Observable, Subject, takeUntil} from 'rxjs';
import {IBooking} from '../../core/types';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'cwb-bookings',
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingsComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private bookings$$: BehaviorSubject<IBooking[]> = new BehaviorSubject<IBooking[]>([]);

    public bookings$: Observable<IBooking[]> = this.bookings$$.asObservable().pipe(
        tap(console.log)
    );

    constructor(private bookingService: BookingService) {
    }

    ngOnInit(): void {
        this.bookingService.getBookings$().pipe(
            takeUntil(this.destroy$$.asObservable()),
            tap(this.bookings$$.next.bind(this.bookings$$))
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }


}
