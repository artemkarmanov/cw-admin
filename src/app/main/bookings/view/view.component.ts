import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, pluck, Subject, takeUntil} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ViewService} from './view.service';
import {IBooking} from '../../../core/types';

@Component({
    selector: 'cwb-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ViewService
    ]
})
export class ViewComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();

    public booking$: Observable<IBooking> = this.viewService.currentBookingData$.pipe(
    );

    constructor(
        private route: ActivatedRoute,
        private viewService: ViewService
    ) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            takeUntil(this.destroy$$.asObservable()),
            pluck('booking_id'),
            tap(this.viewService.loadBooking.bind(this.viewService)),
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

}
