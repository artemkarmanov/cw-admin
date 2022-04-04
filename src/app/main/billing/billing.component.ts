import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BillingService} from "@services/billing.service";
import {BehaviorSubject, tap} from "rxjs";
import {ModalService} from "@services/modal.service";
import {BillingViewComponent} from "./billing-view/billing-view.component";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {IBilling} from "@interfaces/billing.interfaces";
import {billingTableConfig} from "./billing.table.config";
import {Title} from "@angular/platform-browser";

@UntilDestroy()
@Component({
	selector: 'cwb-billing',
	templateUrl: './billing.component.html',
	styleUrls: ['./billing.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [BillingService]
})
export class BillingComponent implements OnInit {
	public dataSource$ = new BehaviorSubject<IBilling[]>([])
	public columnsConfig = billingTableConfig

	constructor(
		private service: BillingService,
		private modal: ModalService,
		private titleService: Title
	) {
	}

	ngOnInit() {
		this.titleService.setTitle('CaptionWorks | Billing')
		this.load()
	}

	public load() {
		this.service
			.billings$()
			.pipe(
				untilDestroyed(this),
				tap((result) => this.dataSource$.next(result)),
			)
			.subscribe()
	}

	public billingPopup($event: {data: IBilling}) {
		const modal = this.modal.open(BillingViewComponent)
		modal.componentInstance.billingResultId = $event.data.billingResultId
	}
}
