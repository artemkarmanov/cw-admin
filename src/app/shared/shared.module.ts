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


@NgModule({
    declarations: [
        TimezoneSelectorComponent,
        ViewersListComponent,
        RegionPipe,
        CityPipe,
        ConfirmationDialogComponent,
        StatusDirective,
        SessionDialogComponent,
        CardComponent,
        PageTopComponent,
        ButtonHeaderComponent,
        IconComponent,
        TableDirective
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        TimezoneSelectorComponent,
        ViewersListComponent,
        RegionPipe,
        CityPipe,
        StatusDirective,
        SessionDialogComponent,
        CardComponent,
        PageTopComponent,
        ButtonHeaderComponent,
        IconComponent,
        TableDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedProviderModule
    ]
})
export class SharedModule {
}
