import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject, switchMap, takeUntil, withLatestFrom} from 'rxjs';
import {IAdminSession, ISession} from '../../core/types';
import {FilterComponent} from './filter/filter.component';
import {tap} from 'rxjs/operators';
import {SessionService} from '../../shared/session.service';
import {BreadCrumbsService} from '../../core/bread-crumbs.service';
import { DateTime } from 'luxon';


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
    private editClick$$: Subject<IAdminSession> = new Subject<IAdminSession>();
    private sessions$$: Subject<IAdminSession[]> = new Subject<IAdminSession[]>();
    public sessions$: Observable<IAdminSession[]> = this.sessions$$.asObservable();

    @ViewChild(FilterComponent)
    private filter!: FilterComponent;

    constructor(
        private sessionService: SessionService,
        private breadCrumbsService: BreadCrumbsService,
    ) {
    }

    // This is the edit session card that appears on the Admin Side
    ngOnInit(): void {
        this.breadCrumbsService.set([{
            path: '/sessions',
            title: 'Sessions'
        }]);
        this.cancelClick$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(this.sessionService.cancel$.bind(this.sessionService)),
            tap(() => this.reload$$.next()),
        ).subscribe();
        this.editClick$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(this.sessionService.edit$.bind(this.sessionService)),
            tap(() => this.reload$$.next()),
        ).subscribe();

    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    ngAfterViewInit(): void {
        this.filter.get$().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(({fromEpoch, toEpoch}) => this.sessionService.getSessionsSummary$(fromEpoch, toEpoch)),
            tap((_) => this.sessions$$.next(_))
        ).subscribe();

        this.reload$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            withLatestFrom(this.filter.get$(), (_, f) => f),
            switchMap(({fromEpoch, toEpoch}) => this.sessionService.getSessionsSummary$(fromEpoch, toEpoch)),
            tap((_) => this.sessions$$.next(_))
        ).subscribe();

    }

    cancel(id: number) {
        this.cancelClick$$.next(id);

    }

    edit(session: IAdminSession) {
        this.editClick$$.next(session);

    }

    reload() {
        this.reload$$.next();
    }

    isEditable(session: IAdminSession): boolean {
        return session.status === 'Future';
    }

    // Even cancelled sessions were showing up on the admin side after they'd been cancelled
    // which was making the list of sessions very long, so I decided to hide cancelled
    // sessions from being displayed using this function
    isNotCancelled(session: IAdminSession): boolean {
        return session.status !== 'Cancelled'
    }

    // The backend now sends/receives/stores times in seconds (instead of milliseconds)
    // so this function is necessary.  It takes the start time, multiplies it by 1000
    // (to put it in milisecond format), then changes the timezone 
    public getAdjustedHour(start: any, tz: any) {
        if (tz === "") {
            tz = "America/New_York"
        }
        let dt = DateTime.fromMillis(start * 1000, {zone: tz,  locale: tz})
        let dater = dt.toISO({format: 'extended'}).toString();
        
        
        return dater
    }

    showLogs(s: any) {
        this.sessionService.getSessionViewerLogs$(s.sessionId).subscribe(v => console.log(v))
        
    }


}
