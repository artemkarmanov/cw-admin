import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimezoneSelectorComponent} from '@cmp/timezone-selector/timezone-selector.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ViewersListComponent} from './viewers-list/viewers-list.component';
import {RegionPipe} from '@pipes/region.pipe';
import {CityPipe} from '@pipes/city.pipe';
import {ConfirmationDialogComponent} from '@cmp/confirmation-dialog/confirmation-dialog.component';
import {SharedProviderModule} from './shared-provider.module';
import {StatusDirective} from '@directives/status.directive';
import {CardComponent} from '@cmp/card/card.component';
import {PageTopComponent} from '@cmp/page-top/page-top.component';
import {ButtonHeaderComponent} from '@cmp/button-header/button-header.component';
import {IconComponent} from '@cmp/icon/icon.component';
import {TableDirective} from '@directives/table.directive';
import {TimezonePipe} from '@pipes/timezone.pipe';
import {AdjustTimePipe} from '@pipes/adjust-time.pipe';
import {FooterComponent} from "@cmp/footer/footer.component";
import {InputComponent} from "@cmp/input/input.component";
import {SmallButtonComponent} from "@cmp/small-button/small-button.component";
import {SvgIconComponent} from '@cmp/svg-icon/svg-icon.component';
import {ButtonComponent} from "@cmp/button/button.component";
import {ErrorComponent} from "@cmp/footer/error/error.component";
import {HeaderComponent} from "@cmp/header/header.component";
import {BreadCrumbsComponent} from "@cmp/header/bread-crumbs/bread-crumbs.component";
import {LogoutButtonComponent} from "@cmp/header/logout-button/logout-button.component";
import {MenuComponent} from "@cmp/header/menu/menu.component";
import {UserInfoComponent} from "@cmp/header/user-info/user-info.component";
import {RouterModule} from "@angular/router";
import {SmartTableComponent} from '@cmp/smart-table/smart-table.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {BadgeComponent} from '@cmp/badge/badge.component';

const declarationsExports = [
	TimezoneSelectorComponent,
	ViewersListComponent,
	RegionPipe,
	CityPipe,
	TimezonePipe,
	ConfirmationDialogComponent,
	StatusDirective,
	CardComponent,
	PageTopComponent,
	ButtonHeaderComponent,
	IconComponent,
	TableDirective,
	AdjustTimePipe,
	ButtonComponent,
	FooterComponent,
	SvgIconComponent,
	InputComponent,
	SmallButtonComponent,
	ErrorComponent,
	HeaderComponent,
	BreadCrumbsComponent,
	LogoutButtonComponent,
	MenuComponent,
	UserInfoComponent,
	FooterComponent,
	SmartTableComponent,
	BadgeComponent
]

@NgModule({
	declarations: [
		...declarationsExports,
	],
	exports: [
		...declarationsExports,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		ReactiveFormsModule,
		SharedProviderModule,
		Ng2SmartTableModule
	]
})
export class SharedModule {
}
