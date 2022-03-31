import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimezoneSelectorComponent} from './timezone-selector/timezone-selector.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {ButtonComponent} from './components/button/button.component';
import {FooterComponent} from "./components/footer/footer.component";
import {InputComponent} from "./components/input/input.component";
import {SmallButtonComponent} from "./components/small-button/small-button.component";
import {IconComponent as Icon2Component} from './components/icon/icon.component';

@NgModule({
    declarations: [
        TimezoneSelectorComponent,
        ViewersListComponent,
        RegionPipe,
        CityPipe,
        TimezonePipe,
        ConfirmationDialogComponent,
        StatusDirective,
        SessionDialogComponent,
        CardComponent,
        PageTopComponent,
        ButtonHeaderComponent,
        IconComponent,
        TableDirective,
        SessionCaptionDialogComponent,
        AdjustTimePipe,
        ButtonComponent,
        FooterComponent,
        Icon2Component,
        InputComponent,
        SmallButtonComponent
    ],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TimezoneSelectorComponent,
		ViewersListComponent,
		RegionPipe,
		CityPipe,
		TimezonePipe,
		StatusDirective,
		SessionDialogComponent,
		CardComponent,
		PageTopComponent,
		ButtonHeaderComponent,
		IconComponent,
		TableDirective,
		SessionCaptionDialogComponent,
		AdjustTimePipe,
		Icon2Component
	],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedProviderModule
    ]
})
export class SharedModule {
}
