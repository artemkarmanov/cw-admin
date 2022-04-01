import {NgModule} from '@angular/core';

import {SessionsRoutingModule} from './sessions-routing.module';
import {SessionsPageComponent} from './sessions-page.component';
import {FilterComponent} from './filter/filter.component';
import {SharedModule} from '../../shared/shared.module';
import {OwnerPipe} from './owner.pipe';
import {
    SessionViewerLogsDialogComponent
} from "./dialogs/session-viewer-logs-dialog/session-viewer-logs-dialog.component";
import {
    SessionCaptionDialogComponent
} from "./dialogs/session-caption-dialog/session-caption-dialog.component";
import {SessionDialogComponent} from "./dialogs/session-dialog/session-dialog.component";


@NgModule({
    declarations: [
        SessionsPageComponent,
        FilterComponent,
        OwnerPipe,
        SessionViewerLogsDialogComponent,
        SessionCaptionDialogComponent,
        SessionDialogComponent,
    ],
    imports: [
        SessionsRoutingModule,
        SharedModule
    ]
})
export class SessionsModule {
}
