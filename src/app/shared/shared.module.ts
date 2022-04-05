import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedProviderModule} from './shared-provider.module';
import {RouterModule} from "@angular/router";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {sharedConfig} from "./shared.config";

@NgModule({
	declarations: [
		...sharedConfig,
	],
	exports: [
		...sharedConfig,
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
