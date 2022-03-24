import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ISession} from '../../../../core/types';
import {environment} from '../../../../../environments/environment';
import {Subject, switchMap, takeUntil} from 'rxjs';
import {SessionService} from '../../../../shared/session.service';
import {ViewService} from '../view.service';
import {tap} from 'rxjs/operators';
import { DateTime } from 'luxon';

@Component({
    selector: 'cwb-sessions',
    templateUrl: './sessions.component.html',
    styleUrls: ['./sessions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionsComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private editClick$$: Subject<ISession> = new Subject<ISession>();
    private cancelClick$$: Subject<number> = new Subject<number>();
    public isAdmin = environment.role;
    @Input() data!: ISession[];

    constructor(private sessionService: SessionService, private viewService: ViewService) {
    }

    // This is the session card that appears on the Viewer Side
    ngOnInit(): void {
        this.editClick$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(session => this.sessionService.edit$(session)),
            tap(() => this.viewService.reload())
        ).subscribe()
        this.cancelClick$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(id => this.sessionService.cancel$(id)),
            tap(() => this.viewService.reload())
        ).subscribe()
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    edit(session: ISession) {
        if (this.isAdmin) {
            this.editClick$$.next(session);
        }
    }

    cancel(id: number) {
        if (this.isAdmin) {
            this.cancelClick$$.next(id);
        }
    }

    isEditable(session: ISession): boolean {
        return session.status === 'Future';
    }

    // The backend now sends/receives/stores times in seconds (instead of milliseconds)
    // so this function is necessary.  It takes the start time, multiplies it by 1000
    // (to put it in milisecond format), then changes the timezone 
    public getAdjustedHour(start: any, tz: any) {
        console.log(tz)
        if (tz === "") {
            tz = "America/New_York"
        }
        let dt = DateTime.fromMillis(start * 1000, {zone: tz,  locale: tz})
        let dater = dt.toISO({format: 'extended'}).toString();
        
        
        return dater
    } 

}
