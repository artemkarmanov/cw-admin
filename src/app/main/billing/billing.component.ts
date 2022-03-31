import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BillingService} from "../../core/billing.service";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {IBilling} from "../../core/types";
import {ModalService} from "../../core/modal.service";
import {BillingViewComponent} from "./billing-view/billing-view.component";
import {map} from "rxjs/operators";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

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
	public billings$: Observable<IBilling[]> | undefined
	public pages: number[] = []
	public itemsOnPage: number = 12
	public currentPage: number = 0
	public length: number = 0

	constructor(
		private service: BillingService,
		private modal: ModalService
	) {
	}

	ngOnInit() {
		this.service
			.billings$()
			.pipe(
				untilDestroyed(this),
				tap((result) => this.length = result.length),
				tap((result) => this.dataSource$.next(result)),
			)
			.subscribe()

		this.billings$ = this.dataSource$
			.pipe(
				untilDestroyed(this),
				tap((all) => this.pages = Array.from(Array(Math.round(all.length / this.itemsOnPage)).keys())),
				map((all) => all.slice(0, this.itemsOnPage))
			)
	}

	public billingPopup(billing: IBilling) {
		const modal = this.modal.open(BillingViewComponent)
		modal.componentInstance.billingResultId = billing.billingResultId
	}

	public pickPage(page: number, itemsOnPage: number = this.itemsOnPage) {
		this.currentPage = page
		this.billings$ = this.dataSource$
			.pipe(
				untilDestroyed(this),
				tap((all) => this.pages = Array.from(Array(Math.round(all.length / itemsOnPage)).keys())),
				map((all) => all.slice(page * itemsOnPage, page * itemsOnPage + itemsOnPage))
			)
	}
}
