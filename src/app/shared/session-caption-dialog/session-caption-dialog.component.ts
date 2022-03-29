import {AuthService} from 'src/app/core/auth.service';
import {ISessionCaptionLogs} from 'src/app/core/types';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Observable, Subject, takeUntil} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {DateTime} from 'luxon';

@Component({
    selector: 'cwb-session-caption-dialog',
    templateUrl: './session-caption-dialog.component.html',
    styleUrls: ['./session-caption-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionCaptionDialogComponent implements OnInit, OnDestroy {
    public isAdmin = environment.role === 'admin';
    public inEditMode = false;
    public data$$: BehaviorSubject<ISessionCaptionLogs[] | []> = new BehaviorSubject<ISessionCaptionLogs[] | []>([]);  
    public userTimezone$: Observable<string> = this.authService.userSettings$
        .pipe(map(data => data.timeZone));
    
    private destroy$$: Subject<void> = new Subject<void>();
    private data$: Observable<ISessionCaptionLogs[]> = this.data$$.asObservable().pipe(
        filter(Boolean)
    );
    constructor(private modal: NgbActiveModal, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.data$.pipe(
            takeUntil(this.destroy$$.asObservable()),
        ).subscribe(data => console.log(data))
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    close() {
        this.modal.dismiss();
    }

    getAdjustedHour(start: number, tz: string | null): string {
        tz = tz === null ? 'America/New_York' : tz;
        let dt = DateTime.fromMillis(start * 1000, {zone: tz});
        let dater = dt.toISO({format: 'extended'}).toString();
        return dater;
    }
}
