import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, pluck, Subject, switchMap, takeUntil} from 'rxjs';
import {filter, tap} from 'rxjs/operators';
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
    private booking$$: Subject<IBooking> = new Subject<IBooking>();
    public booking$: Observable<IBooking> = this.booking$$.asObservable();

    constructor(
        private route: ActivatedRoute,
        private viewService: ViewService
    ) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            takeUntil(this.destroy$$.asObservable()),
            pluck('booking_id'),
            switchMap(token => this.viewService.getBooking(token)),
            filter(Boolean),
            tap(this.booking$$.next.bind(this.booking$$))
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

}
