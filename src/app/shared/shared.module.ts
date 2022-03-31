import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimezoneSelectorComponent} from './timezone-selector/timezone-selector.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ViewersListComponent} from './viewers-list/viewers-list.component';
import {RegionPipe} from './region.pipe';
import {CityPipe} from './city.pipe';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {SharedProviderModule} from './shared-provider.module';
import {StatusDirective} from './status.directive';
import {SessionDialogComponent} from './session-dialog/session-dialog.component';
import {CardComponent} from './card/card.component';
import {PageTopComponent} from './page-top/page-top.component';
import {ButtonHeaderComponent} from './button-header/button-header.component';
import {IconComponent} from './icon/icon.component';
import {TableDirective} from '../table.directive';
import {TimezonePipe} from './timezone.pipe';
import {SessionCaptionDialogComponent} from './session-caption-dialog/session-caption-dialog.component';
import {AdjustTimePipe} from './adjust-time.pipe';
import { SessionViewerLogsDialogComponent } from './session-viewer-logs-dialog/session-viewer-logs-dialog.component';


@NgModule({
    declarations: [
        TimezoneSelectorComponent,
        ViewersListComponent,
        RegionPipe,
        CityPipe,
        TimezonePipe,
        ConfirmationDialogComponent,
        SessionViewerLogsDialogComponent,
        StatusDirective,
        SessionDialogComponent,
        CardComponent,
        PageTopComponent,
        ButtonHeaderComponent,
        IconComponent,
        TableDirective,
        SessionCaptionDialogComponent,
        AdjustTimePipe
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        TimezoneSelectorComponent,
        ViewersListComponent,
        RegionPipe,
        CityPipe,
        TimezonePipe,
        StatusDirective,
        SessionDialogComponent,
        SessionViewerLogsDialogComponent,
        CardComponent,
        PageTopComponent,
        ButtonHeaderComponent,
        IconComponent,
        TableDirective,
        SessionCaptionDialogComponent,
        AdjustTimePipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedProviderModule
    ]
})
export class SharedModule {
}
