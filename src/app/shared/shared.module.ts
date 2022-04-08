import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedProviderModule} from './shared-provider.module';
import {RouterModule} from "@angular/router";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {sharedConfig} from "./shared.config";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {AccordionModule} from "@cmp/accordion/accordion.module";
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
	declarations: [
		...sharedConfig
	],
	exports: [
		...sharedConfig,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AccordionModule
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		NgSelectModule,
		SharedProviderModule,
		Ng2SmartTableModule,
		NgxDaterangepickerMd.forRoot(),
		AccordionModule
	]
})
export class SharedModule {
}
