import {Injectable} from '@angular/core';
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";

@Injectable({providedIn: 'root'})
export class BillingService {
	@Dispatch()
	public billings$() {
		return new Send({
			type: MessageType.GetBillingResults
		})
	}

	@Dispatch()
	public billing$(billingResultId: number) {
		return new Send({
			type: MessageType.GetBillingDetails,
			data: {billingResultId}
		})
	}
}
