import {Injectable, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject, Subject, switchMap, takeUntil, withLatestFrom} from 'rxjs';
import {BookingService} from '../booking.service';
import {filter, tap} from 'rxjs/operators';
import {IBooking} from "@interfaces/booking.interfaces";

@Injectable()
export class ViewService implements OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private load$$: Subject<string> = new Subject<string>();
    private reload$$: Subject<void> = new Subject<void>();

    private booking$$: ReplaySubject<IBooking> = new ReplaySubject<IBooking>(1);
    public currentBookingData$: Observable<IBooking> = this.booking$$.asObservable();

    constructor(private bookingService: BookingService) {
        this.load$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(this.bookingService.getBooking$.bind(this.bookingService)),
            filter(Boolean),
            tap(this.booking$$.next.bind(this.booking$$))
        ).subscribe();

        this.reload$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            withLatestFrom(this.booking$$.asObservable(), (_, {bookingToken}) => {
                return bookingToken;
            }),
            switchMap(this.bookingService.getBooking$.bind(this.bookingService)),
            filter(Boolean),
            tap(this.booking$$.next.bind(this.booking$$))
        ).subscribe();
    }

    public loadBooking(token: string): void {
        this.load$$.next(token);
    }

    public reload() {
        this.reload$$.next();

    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

}
