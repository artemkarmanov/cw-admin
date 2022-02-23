import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject, switchMap, takeUntil, withLatestFrom} from 'rxjs';
import {IAdminSession} from '../../core/types';
import {FilterComponent} from './filter/filter.component';
import {tap} from 'rxjs/operators';
import {SessionService} from '../../shared/session.service';

@Component({
    selector: 'cwb-sessions-page',
    templateUrl: './sessions-page.component.html',
    styleUrls: ['./sessions-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionsPageComponent implements OnInit, AfterViewInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private reload$$: Subject<void> = new Subject<void>();
    private cancelClick$$: Subject<number> = new Subject<number>();
    private editClick$$: Subject<number> = new Subject<number>();
    private sessions$$: Subject<IAdminSession[]> = new Subject<IAdminSession[]>();
    public sessions$: Observable<IAdminSession[]> = this.sessions$$.asObservable();

    @ViewChild(FilterComponent)
    private filter!: FilterComponent;

    constructor(private sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.cancelClick$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(this.sessionService.cancel$.bind(this.sessionService)),
            tap(() => this.reload$$.next()),
        ).subscribe();
        this.editClick$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            //switchMap(this.sessionService.edit$.bind(this.sessionService)),
            tap(() => this.reload$$.next()),
        ).subscribe();

    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    ngAfterViewInit(): void {
        this.filter.get$().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(({fromEpoch, toEpoch}) => this.sessionService.getSessions$(fromEpoch, toEpoch)),
            tap((_) => this.sessions$$.next(_))
        ).subscribe();

        this.reload$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            withLatestFrom(this.filter.get$(), (_, f) => f),
            switchMap(({fromEpoch, toEpoch}) => this.sessionService.getSessions$(fromEpoch, toEpoch)),
            tap((_) => this.sessions$$.next(_))
        ).subscribe();
    }

    cancel(id: number) {
        this.cancelClick$$.next(id);

    }

    edit(id: number) {
        this.editClick$$.next(id);

    }

    reload() {
        this.reload$$.next();
    }


}
