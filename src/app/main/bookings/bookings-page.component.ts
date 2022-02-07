import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from './booking.service';
import {BehaviorSubject, Observable, Subject, takeUntil} from 'rxjs';
import {IBooking} from '../../core/types';
import {tap} from 'rxjs/operators';
import {CreateService} from './create/create.service';
import {BreadCrumbsService} from '../../core/bread-crumbs.service';

@Component({
    templateUrl: './bookings-page.component.html',
    styleUrls: ['./bookings-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        CreateService
    ]
})
export class BookingsPageComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private bookings$$: BehaviorSubject<IBooking[]> = new BehaviorSubject<IBooking[]>([]);

    public bookings$: Observable<IBooking[]> = this.bookings$$.asObservable().pipe(
        //tap(console.log)
    );

    constructor(private bookingService: BookingService, private breadCrumbsService: BreadCrumbsService) {
    }

    ngOnInit(): void {
        this.breadCrumbsService.set([]);
        this.bookingService.getBookings$().pipe(
            takeUntil(this.destroy$$.asObservable()),
            tap(this.bookings$$.next.bind(this.bookings$$))
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }


}
