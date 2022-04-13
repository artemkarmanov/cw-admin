import {Injectable} from '@angular/core';
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";

@Injectable()
export class StripeService {

	@Dispatch()
	getStripeClientSecret$() {
		return new Send({type: MessageType.GetStripeClientSecret})
	}
}
