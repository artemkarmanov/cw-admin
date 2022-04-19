import {IBilling, IBillingDetails} from "@interfaces/billing.interfaces";
import {HttpStatusCode} from "@angular/common/http";
import {ResponseType} from "@constants/response-type";

export class GetBillingResultsResponse {
	static readonly type = ResponseType.GetBillingResultsResponse

	constructor(
		public data: {billing_results: IBilling[]},
		public code: HttpStatusCode,
		public p: number,
		public error: string
	) {
	}
}

export class GetBillingDetailsResponse {
	static readonly type = ResponseType.GetBillingDetailsResponse

	constructor(
		public data: {billing_details: IBillingDetails},
		public code: HttpStatusCode,
		public p: number,
		public error: string
	) {
	}
}
