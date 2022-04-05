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
import {SessionOwnerComponent} from "./sessions-table/session-owner/session-owner.component";

export const sessionsTableConfig = {
	sessionId: {
		title: 'Session ID',
		width: '120px'
	},
	startEpoch: {
		title: 'Session start',
		width: '211px',
		valuePrepareFunction: prepareDate,
		filter: false,
		sort: false
	},
	title: {
		title: 'Title',
		type: 'custom',
		renderComponent: SessionLinkComponent
	},
	sessionDurationMins: {
		title: 'Duration',
		width: '110px'
	},
	status: {
		title: 'Status',
		type: 'custom',
		renderComponent: SessionStatusBadgeComponent,
		width: '100px'
	},
	ownerEmail: {
		title: 'Owner',
		type: 'custom',
		renderComponent: SessionOwnerComponent
	},
	actions: {
		title: 'Actions',
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
