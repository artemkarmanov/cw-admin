import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BillingRoutingModule} from './billing-routing.module';
import {BillingComponent} from './billing.component';
import {SharedModule} from "../../shared/shared.module";
import {BillingViewComponent} from './billing-view/billing-view.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BillingStatusComponent } from './billings-table/billing-status/billing-status.component';

@NgModule({
	declarations: [
		BillingComponent,
		BillingViewComponent,
  BillingStatusComponent,
	],
	imports: [
		CommonModule,
		BillingRoutingModule,
		SharedModule,
		Ng2SmartTableModule
	]
})
export class BillingModule {
}
