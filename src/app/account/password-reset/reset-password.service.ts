import {Injectable} from '@angular/core';
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";

@Injectable()
export class ResetPasswordService {
    @Dispatch()
    reset$(email: string, site: string) {
        return new Send({
            type: MessageType.StartResetPassword,
            data: {email, site}
        })
    }
}
