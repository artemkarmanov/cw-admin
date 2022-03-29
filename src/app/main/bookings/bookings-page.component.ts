import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from './booking.service';
import {BehaviorSubject, Observable, Subject, switchMap, takeUntil} from 'rxjs';
import {IBookingSummary, IUserSettings} from '../../core/types';
import {map, tap} from 'rxjs/operators';
import {CreateService} from './create/create.service';
import {BreadCrumbsService} from '../../core/bread-crumbs.service';
import {IANAZone} from 'luxon';
import {AuthService} from "../../core/auth.service";
import {DatePipe} from "@angular/common";

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
    public bookings$: Observable<IBookingSummary[]> = this.authService.userSettings$.pipe(
      switchMap((user: IUserSettings) => this.bookings$$.asObservable().pipe(
        map((bookings: IBookingSummary[]) => bookings
          .map(booking => ({
              ...booking,
              nextSessionStartEpoch: (booking.nextSessionStartEpoch * 1000)
          }))
          .map(booking => {
              const offset = IANAZone
                .create(user.timeZone)
                .formatOffset(booking.nextSessionStartEpoch, 'techie')
              return {
                  ...booking,
                  date: new DatePipe('en-US')
                    .transform(
                      booking.nextSessionStartEpoch,
                      'short',
                      offset
                    )!
              }
          }))
      ))
    )

    constructor(
        private bookingService: BookingService,
        private breadCrumbsService: BreadCrumbsService,
        private authService: AuthService
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

    public reload(): void {
        this.reload$$.next();
    }
}
