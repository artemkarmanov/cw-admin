import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimezoneSelectorComponent} from "./timezone-selector/timezone-selector.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const declarationsExports = [
	TimezoneSelectorComponent
]

const modules = [
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	NgSelectModule
]

@NgModule({
	imports: [
		...modules
	],
	declarations: [
		...declarationsExports
	],
	exports: [
		...declarationsExports,
		...modules
	]
})
export class CoreModule {
}
