import {IBilling, IBillingDetails} from "@interfaces/billing.interfaces";
import {HttpStatusCode} from "@angular/common/http";

export class GetBillingResultsResponse {
	static readonly type = 'getBillingResultsResp'

	constructor(
		public data: {billing_results: IBilling[]},
		public code: HttpStatusCode,
		public p: number,
		public error: string
	) {
	}
}

export class GetBillingDetailsResponse {
	static readonly type = 'getBillingDetailsResp'

	constructor(
		public data: {billing_details: IBillingDetails},
		public code: HttpStatusCode,
		public p: number,
		public error: string
	) {
	}
}
