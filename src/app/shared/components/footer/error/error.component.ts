import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorHandlerService} from '@services/error-handler.service';
import {BehaviorSubject, delay, Observable, Subject, takeUntil} from 'rxjs';
import {filter, tap} from 'rxjs/operators';

const ERROR_TIME = 2000;

@Component({
    selector: 'cwb-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private showError$$: BehaviorSubject<Error | null> = new BehaviorSubject<Error | null>(null);
    public messages$: Observable<Error | null> = this.showError$$.asObservable();

    constructor(private error: ErrorHandlerService) {
    }

    ngOnInit(): void {
        this.error.listen$().pipe(
            takeUntil(this.destroy$$.asObservable())
        ).subscribe(
            this.showError$$
        );
        this.error.listen$().pipe(
            takeUntil(this.destroy$$.asObservable()),
            filter(Boolean),
            delay(ERROR_TIME),
            tap(() => {
                this.showError$$.next(null);
            })
        ).subscribe(

        );
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

}
