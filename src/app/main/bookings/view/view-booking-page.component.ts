import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, pluck, Subject, takeUntil} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ViewService} from './view.service';
import {BreadCrumbsService} from '@services/bread-crumbs.service';
import {IBooking} from "@interfaces/booking.interfaces";

@Component({
    selector: 'cwb-booking-page',
    templateUrl: './view-booking-page.component.html',
    styleUrls: ['./view-booking-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ViewService]
})
export class ViewBookingPageComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();

    public booking$: Observable<IBooking> = this.viewService.currentBookingData$.pipe(
        map((booking) => {
            const {sessions} = booking;
            sessions.sort((a, b) => {
                return a.startEpoch - b.startEpoch;
            });

            return booking;
        })
    );

    constructor(
        private route: ActivatedRoute,
        private viewService: ViewService,
        private breadCrumbsService: BreadCrumbsService
    ) {
    }

    ngOnInit(): void {

        this.route.params.pipe(
            takeUntil(this.destroy$$.asObservable()),
            pluck('booking_id'),
            tap(this.viewService.loadBooking.bind(this.viewService))
        ).subscribe();
        this.booking$.pipe(
            takeUntil(this.destroy$$.asObservable()),
        ).subscribe((booking) => {
            this.breadCrumbsService.set([
                {
                    path: '/bookings',
                    title: 'Bookings'
                },
                {
                    title: booking.title,
                    path: ['bookings', booking.bookingToken].join('/')
                }
            ])
        });
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

}
