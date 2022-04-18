import {NgModule} from '@angular/core';
import {SharedProviderModule} from '../shared-provider.module';
import {RouterModule} from "@angular/router";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {sharedConfig} from "./shared.config";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {AccordionModule} from "@cmp/accordion/accordion.module";
import {CdkStepper, CdkStepperModule} from "@angular/cdk/stepper";
import {CoreModule} from "./core/core.module";

@NgModule({
	declarations: [
		...sharedConfig
	],
	providers: [
		CdkStepper
	],
	imports: [
		CoreModule,
		RouterModule,
		SharedProviderModule,
		Ng2SmartTableModule,
		NgxDaterangepickerMd.forRoot(),
		AccordionModule,
		CdkStepperModule
	],
	exports: [
		...sharedConfig,
		CoreModule,
		AccordionModule,
		CdkStepperModule
	]
})
export class SharedModule {
}
