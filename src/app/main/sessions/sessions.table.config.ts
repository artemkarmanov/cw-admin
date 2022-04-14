import {Injector} from "@angular/core";
import {AdjustTimePipe} from "@pipes/adjust-time.pipe";
import {AsyncPipe} from "@angular/common";
import {SessionLinkComponent} from "./sessions-table/session-link/session-link.component";
import {
	SessionTableActionsComponent
} from "./sessions-table/session-table-actions/session-table-actions.component";
import {
	SessionStatusBadgeComponent
} from "./sessions-table/session-status-badge/session-status-badge.component";

export const sessionsTableConfig = {
	sessionId: {
		title: 'Session ID',
		width: '120px'
	},
	title: {
		title: 'Booking',
		type: 'custom',
		renderComponent: SessionLinkComponent
	},
	startEpoch: {
		title: 'Start time',
		width: '256px',
		valuePrepareFunction: prepareDate,
		filter: false,
		sort: false
	},
	sessionDurationMins: {
		title: 'Duration (mins)',
		width: '152px',
	},
	status: {
		title: 'Status',
		type: 'custom',
		renderComponent: SessionStatusBadgeComponent,
		width: '130px',
		filter: {
			type: 'list',
			config: {
				selectText: 'All',
				list: [
					{value: 'future', title: 'Future'},
					{value: 'cancelled', title: 'Cancelled'},
					{value: 'completed', title: 'Completed'},
					{value: 'running', title: 'Running'},
				],
			},
		}
	},
	owner: {
		title: 'Owner',
		class: 'preserve',
		type: 'html',
		valuePrepareFunction: (owner: string) => (
			'<span class="preserve">' + owner + '</span>'
		),
	},
	actions: {
		title: 'Actions / Logs',
		type: 'custom',
		renderComponent: SessionTableActionsComponent,
		filter: false,
		sort: false
	}
}

function prepareDate(date: number) {
	const injector = Injector.create({
		providers: [
			{provide: AdjustTimePipe},
			{provide: AsyncPipe}
		]
	})

	return injector
		.get(AsyncPipe)
		.transform(injector.get(AdjustTimePipe).transform(date))
}
