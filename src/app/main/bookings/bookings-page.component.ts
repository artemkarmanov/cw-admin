import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from './booking.service';
import {BehaviorSubject, Observable, Subject, switchMap, takeUntil} from 'rxjs';
import {IBookingSummary} from '../../core/types';
import {map, tap} from 'rxjs/operators';
import {CreateService} from './create/create.service';
import {BreadCrumbsService} from '../../core/bread-crumbs.service';
import { DateTime } from 'luxon';

@Component({
    selector: 'cwb-bookings-page',
    templateUrl: './bookings-page.component.html',
    styleUrls: ['./bookings-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        CreateService
    ]
})
export class BookingsPageComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private reload$$: Subject<void> = new Subject<void>();
    private bookings$$: BehaviorSubject<IBookingSummary[]> = new BehaviorSubject<IBookingSummary[]>([]);

    public bookings$: Observable<IBookingSummary[]> = this.bookings$$.asObservable().pipe(
        //tap(console.log)
    );

    public hrsDiff: number = -9;

    constructor(
        private bookingService: BookingService,
        private breadCrumbsService: BreadCrumbsService
    ) {
    }

    ngOnInit(): void {

        



        this.breadCrumbsService.set([{
            path: '/bookings',
            title: 'Bookings'
        }]);

        this.bookingService.getBookings$().pipe(
            takeUntil(this.destroy$$.asObservable()),
            tap(this.bookings$$.next.bind(this.bookings$$)),
        ).subscribe();

        this.reload$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(() => this.bookingService.getBookings$()),
            tap(this.bookings$$.next.bind(this.bookings$$))
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    // The backend now sends/receives/stores times in seconds (instead of milliseconds)
    // so this function is necessary.  It takes the start time, multiplies it by 1000
    // (to put it in milisecond format), then changes the timezone 
    public getAdjustedHour(start: any, tz: any) {
        console.log(tz)
        if (tz === "") {
            tz = "America/New_York"
        }
        let dt = DateTime.fromMillis(start * 1000, {zone: tz,  locale: tz})
        let dater = dt.toISO({format: 'extended'}).toString();
        
        
        return dater
    }

    public reload(): void {
        this.reload$$.next();
    }


}


