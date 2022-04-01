import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, pluck, takeUntil, tap} from "rxjs";
import {SocketMessagesService} from "./socket-messages.service";
import {filter, map} from "rxjs/operators";
import {IBilling, IBillingDetails} from "@interfaces/billing.interfaces";

@Injectable({providedIn: 'root'})
export class BillingService {
	private loaded$ = new BehaviorSubject(false)

	constructor(
		private messages: SocketMessagesService
	) {
	}

	public billings$(): Observable<IBilling[]> {
		return this.messages
			.request$<{ billing_results: IBilling[] }>('getBillingResults')
			.pipe(
				takeUntil(this.loaded$.pipe(filter((Boolean)))),
				tap(() => this.loaded$.next.bind(true)),
				pluck('billing_results'),
				map((results) => [...results].reverse())
			)
	}

	public billing$(billingResultId: number): Observable<IBillingDetails> {
		return this.messages
			.request$<{billing_details: IBillingDetails}>('getBillingDetails', {billingResultId})
			.pipe(
				takeUntil(this.loaded$.pipe(filter(Boolean))),
				tap(() => this.loaded$.next.bind(true)),
				pluck('billing_details')
			)
	}
}
