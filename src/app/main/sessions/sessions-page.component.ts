import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject, switchMap} from 'rxjs';
import {SessionsService} from './sessions.service';
import {BreadCrumbsService} from '@services/bread-crumbs.service';
import {IAdminSession, IRangePicker} from "@interfaces/session.interfaces";
import {Title} from "@angular/platform-browser";
import {sessionsTableConfig} from "./sessions.table.config";
import {FormControl} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'cwb-sessions-page',
    templateUrl: './sessions-page.component.html',
    styleUrls: ['./sessions-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SessionsPageComponent implements OnInit, AfterViewInit {
    public rangePicker = new FormControl(SessionsPageComponent.retrieveSavedRange());
    public columnsConfig = sessionsTableConfig
    public sessions$!: Observable<IAdminSession[]>
    private reload$$: Subject<void> = new Subject<void>();

    constructor(
        private sessionService: SessionsService,
        private breadCrumbsService: BreadCrumbsService,
        private titleService: Title
    ) {
    }

    private static retrieveSavedRange(): { startDate: Date, endDate: Date } | null {
        const key = localStorage.getItem('session-dates')
        if (key) {
            const value = JSON.parse(key) as IRangePicker
            return {startDate: new Date(value.startDate), endDate: new Date(value.endDate)}
        } else {
            return null
        }
    }

    ngOnInit(): void {
        this.titleService.setTitle('CaptionWorks | Sessions')
        this.breadCrumbsService.set([{
            path: '/sessions',
            title: 'Sessions'
        }]);
        this.sessions$ = this.session$$()
    }

    ngAfterViewInit() {
        this.reload$$.next()
    }

    public changedDates() {
        const dates = this.rangePicker.value
        if (dates) {
            const start = Number(new Date(dates.startDate))
            const end = Number(new Date(dates.endDate))

            localStorage.setItem('session-dates', JSON.stringify({startDate: start, endDate: end}))

            this.sessions$ = this.session$$(start, end)
        }
    }

    public reload() {
        this.reload$$.next();
    }

    private session$$(start?: number, end?: number): Observable<IAdminSession[]> {
        return this.sessions$ = this.reload$$.asObservable().pipe(
            untilDestroyed(this),
            switchMap(() => this.sessionService.getSessionsSummary$(start, end))
        )
    }
}
