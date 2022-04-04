import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from './booking.service';
import {BehaviorSubject, Observable, Subject, switchMap, takeUntil} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CreateService} from './create/create.service';
import {BreadCrumbsService} from '@services/bread-crumbs.service';
import {IBookingSummary} from "@interfaces/booking.interfaces";
import {Title} from "@angular/platform-browser";
import {bookingsTableConfig} from "./bookings.table.config";

@Component({
    selector: 'cwb-bookings-page',
    templateUrl: './bookings-page.component.html',
    styleUrls: ['./bookings-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateService]
})
export class BookingsPageComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private reload$$: Subject<void> = new Subject<void>();
    private bookings$$: BehaviorSubject<IBookingSummary[]> = new BehaviorSubject<IBookingSummary[]>([]);
    public bookings$: Observable<IBookingSummary[]> = this.bookings$$.asObservable();
    public hrsDiff: number = -9;
    public columnsConfig = bookingsTableConfig;

    constructor(
        private bookingService: BookingService,
        private breadCrumbsService: BreadCrumbsService,
        private titleService: Title
    ) {
    }

    ngOnInit(): void {
        this.titleService.setTitle('CaptionWorks | Bookings')

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

    public reload(): void {
        this.reload$$.next();
    }
}
