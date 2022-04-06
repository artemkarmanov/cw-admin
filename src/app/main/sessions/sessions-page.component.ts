import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, Observable, switchMap, tap} from 'rxjs';
import {SessionsService} from './sessions.service';
import {BreadCrumbsService} from '@services/bread-crumbs.service';
import {IAdminSession} from "@interfaces/session.interfaces";
import {Title} from "@angular/platform-browser";
import {sessionsTableConfig} from "./sessions.table.config";
import {FormControl} from "@angular/forms";
import {IDateRange} from "@cmp/range-picker/range-picker.component";

@Component({
	selector: 'cwb-sessions-page',
	templateUrl: './sessions-page.component.html',
	styleUrls: ['./sessions-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class SessionsPageComponent implements OnInit, AfterViewInit {
	public rangePicker = new FormControl();
	public columnsConfig = sessionsTableConfig
	public sessions$!: Observable<IAdminSession[]>
	private reload$$: BehaviorSubject<null> = new BehaviorSubject<null>(null);

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
		this.sessions$ = this.session$$()
	}

	ngAfterViewInit() {
		this.load()
	}

	public load() {
		this.reload$$.next(null)
	}

	public changedDates($event: IDateRange | null) {
		this.sessions$ = this.session$$($event?.start, $event?.end)
	}

	private session$$(start?: number, end?: number): Observable<IAdminSession[]> {
		return this.sessions$ = this.reload$$.asObservable()
			.pipe(
				distinctUntilChanged(),
				switchMap(() => this.sessionService.getSessionsSummary$(start, end)),
				tap(() => this.load()),
			)
	}
}
