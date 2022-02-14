import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {SessionService} from '../session.service';

@Component({
    selector: 'cwb-add-session-button',
    templateUrl: './add-session-button.component.html',
    styleUrls: ['./add-session-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        SessionService
    ]
})
export class AddSessionButtonComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private click$$: Subject<void> = new Subject<void>();

    constructor(
        private sessionService: SessionService
    ) {
    }

    ngOnInit(): void {
        this.click$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(this.sessionService.add$())
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    click(): void {
        this.click$$.next();
    }

}
