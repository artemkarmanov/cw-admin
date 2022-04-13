import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {GetBillingDetailsResponse, GetBillingResultsResponse} from "./billings.actions";
import {IBilling, IBillingDetails} from "@interfaces/billing.interfaces";

export interface BillingStateModel {
	billings: IBilling[]
	billing: IBillingDetails
}

@Injectable()
@State<BillingStateModel>({name: 'billings'})
export class BillingsState {

	@Selector()
	public static billings(state: BillingStateModel) {
		return state.billings
	}

	@Selector()
	public static billing(state: BillingStateModel) {
		return state.billing
	}

	@Action(GetBillingResultsResponse)
	private getBillingResultsResponse(
		{patchState}: StateContext<BillingStateModel>,
		{data}: GetBillingResultsResponse
	) {
		return patchState({billings: data.billing_results})
	}

	@Action(GetBillingDetailsResponse)
	private GetBillingDetailsResponse(
		{patchState}: StateContext<BillingStateModel>,
		{data}: GetBillingDetailsResponse
	) {
		return patchState({billing: data.billing_details})
	}
}
