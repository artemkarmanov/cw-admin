import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BillingService} from "../../core/billing.service";
import {Observable} from "rxjs";
import {IBilling} from "../../core/types";
import {ModalService} from "../../core/modal.service";
import {BillingViewComponent} from "./billing-view/billing-view.component";

@Component({
	selector: 'cwb-billing',
	templateUrl: './billing.component.html',
	styleUrls: ['./billing.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [BillingService]
})
export class BillingComponent {
	public billings$: Observable<IBilling[]> = this.service.billings$()

	constructor(
		private service: BillingService,
		private modal: ModalService
	) {
	}

	public billingPopup(billing: IBilling) {
		const modal = this.modal.open(BillingViewComponent)
		modal.componentInstance.billingResultId = billing.billingResultId
	}
}
