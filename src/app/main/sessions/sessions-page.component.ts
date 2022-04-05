import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SessionsService} from './sessions.service';
import {BreadCrumbsService} from '@services/bread-crumbs.service';
import {IAdminSession, IRangePicker} from "@interfaces/session.interfaces";
import {Title} from "@angular/platform-browser";
import {sessionsTableConfig} from "./sessions.table.config";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'cwb-sessions-page',
    templateUrl: './sessions-page.component.html',
    styleUrls: ['./sessions-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SessionsPageComponent implements OnInit, OnDestroy {
    public columnsConfig = sessionsTableConfig
    public sessions$: Observable<IAdminSession[]> = this.sessionService.getSessionsSummary$()
    public rangePicker = new FormControl(SessionsPageComponent.retrieveSavedRange());
    private destroy$$: Subject<void> = new Subject<void>();
    private reload$$: Subject<void> = new Subject<void>();

    constructor(
        private sessionService: SessionsService,
        private breadCrumbsService: BreadCrumbsService,
        private titleService: Title
    ) {
    }

    ngOnInit(): void {
        this.titleService.setTitle('CaptionWorks | Sessions')

        this.breadCrumbsService.set([{
            path: '/sessions',
            title: 'Sessions'
        }]);
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    public changedDates() {
        const dates = this.rangePicker.value
        if (dates) {
            const start = Number(new Date(dates.startDate))
            const end = Number(new Date(dates.endDate))

            localStorage.setItem('session-dates', JSON.stringify({startDate: start, endDate: end}))

            this.sessions$ = this.sessionService.getSessionsSummary$(start, end)
        }
    }

    private static retrieveSavedRange(): {startDate: Date, endDate: Date} | null {
        const key = localStorage.getItem('session-dates')
        if (key) {
            const value = JSON.parse(key) as IRangePicker
            return {startDate: new Date(value.startDate), endDate: new Date(value.endDate)}
        } else {
            return null
        }
    }

    reload() {
        this.reload$$.next();
    }
}
