import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BillingService} from "@services/billing.service";
import {Observable} from "rxjs";
import {BillingViewComponent} from "./billing-view/billing-view.component";
import {IBilling} from "@interfaces/billing.interfaces";
import {billingTableConfig} from "./billing.table.config";
import {Title} from "@angular/platform-browser";
import {DialogService} from "@services/dialog.service";
import {Select} from "@ngxs/store";
import {BillingsState} from "@store/billings.state";

@Component({
	selector: 'cwb-billings',
	templateUrl: './billing.component.html',
	styleUrls: ['./billing.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [BillingService]
})
export class BillingComponent implements OnInit {
	@Select(BillingsState.billings) public dataSource$!: Observable<IBilling[]>
	public columnsConfig = billingTableConfig

	constructor(
		private service: BillingService,
		private modal: DialogService,
		private titleService: Title
	) {
	}

	ngOnInit() {
		this.titleService.setTitle('CaptionWorks | Billing')
		this.load()
	}

	public load() {
		this.service.billings$()
	}

	public billingPopup($event: { data: IBilling }) {
		this.modal.open(
			BillingViewComponent,
			{data: $event.data.billingResultId}
		)
	}
}
