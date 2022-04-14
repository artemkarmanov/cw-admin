import {NgModule} from '@angular/core';
import {SessionsRoutingModule} from './sessions-routing.module';
import {SessionsPageComponent} from './sessions-page.component';
import {SharedModule} from '../../shared/shared.module';
import {OwnerPipe} from './owner.pipe';
import {
	SessionViewerLogsDialogComponent
} from "./dialogs/session-viewer-logs-dialog/session-viewer-logs-dialog.component";
import {
	SessionCaptionDialogComponent
} from "./dialogs/session-caption-dialog/session-caption-dialog.component";
import {SessionDialogComponent} from "./dialogs/session-dialog/session-dialog.component";
import {SessionLinkComponent} from './sessions-table/session-link/session-link.component';
import {
	SessionTableActionsComponent
} from './sessions-table/session-table-actions/session-table-actions.component';
import {SessionsService} from "./sessions.service";
import {
	SessionStatusBadgeComponent
} from './sessions-table/session-status-badge/session-status-badge.component';

@NgModule({
	declarations: [
		SessionsPageComponent,
		OwnerPipe,
		SessionViewerLogsDialogComponent,
		SessionCaptionDialogComponent,
		SessionDialogComponent,
		SessionLinkComponent,
		SessionTableActionsComponent,
		SessionStatusBadgeComponent
	],
	imports: [
		SessionsRoutingModule,
		SharedModule
	],
	providers: [
		SessionsService
	]
})
export class SessionsModule {
}
