import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';
import {SessionsService} from './sessions.service';
import {IAdminSessionRow} from "@interfaces/session.interfaces";
import {Title} from "@angular/platform-browser";
import {sessionsTableConfig} from "./sessions.table.config";
import {FormControl} from "@angular/forms";
import {Select} from "@ngxs/store";
import {SessionsState} from "@store/sessions.state";

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
	@Select(SessionsState.sessions) public sessions$!: Observable<IAdminSessionRow[]>

	constructor(
		private sessionService: SessionsService,
		private titleService: Title
	) {
	}

	ngOnInit(): void {
		this.titleService.setTitle('CaptionWorks | Sessions')
	}

	ngAfterViewInit() {
		this.load()
	}

	public load() {
	}

	public changedDates($event: any) {
		const {start, end} = $event
		this.sessionService.getSessionsSummary$(start, end)
	}
}
