import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil, withLatestFrom} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {SessionService} from '../../../../shared/session.service';
import {ViewService} from '../view.service';
import {ICreateSession} from '../../../../core/types';

@Component({
    selector: 'cwb-add-session-button',
    templateUrl: './add-session-button.component.html',
    styleUrls: ['./add-session-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSessionButtonComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private click$$: Subject<void> = new Subject<void>();

    constructor(
        private sessionService: SessionService,
        private viewService: ViewService
    ) {
    }

    ngOnInit(): void {
        this.click$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(() => this.sessionService.add$()),
            withLatestFrom(this.viewService.currentBookingData$),
            switchMap(([session, booking]) => {
                const data = Object.assign(session, {
                    bookingToken: booking.bookingToken
                }) as ICreateSession;
                return this.sessionService.addSession$(data);
            }),
            tap(() => this.viewService.reload())
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    click(): void {
        this.click$$.next();
    }

}
