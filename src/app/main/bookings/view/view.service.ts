import {Injectable, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject, Subject, switchMap, takeUntil} from 'rxjs';
import {IBooking} from '../../../core/types';
import {BookingService} from '../booking.service';
import {filter, tap} from 'rxjs/operators';

@Injectable()
export class ViewService implements OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private load$$: Subject<string> = new Subject<string>();

    private booking$$: ReplaySubject<IBooking> = new ReplaySubject<IBooking>(1);
    public currentBookingData$: Observable<IBooking> = this.booking$$.asObservable();

    constructor(private bookingService: BookingService) {
        this.load$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(this.bookingService.getBooking$.bind(this.bookingService)),
            filter(Boolean),
            tap(this.booking$$.next.bind(this.booking$$))
        ).subscribe();
    }

    public loadBooking(token: string): void {
        this.load$$.next(token);
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

}
