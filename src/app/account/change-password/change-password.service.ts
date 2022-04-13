import {Injectable} from '@angular/core';
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";

@Injectable()
export class ChangePasswordService {
    @Dispatch()
    public checkResetPassword$(email: string, token: string) {
        return new Send({
            type: MessageType.CheckResetPassword,
            data: {email, token}
        })
    }

    @Dispatch()
    public changePassword$(email: string, token: string, password: string) {
        return new Send({
            type: MessageType.ChangePassword,
            data: {email, token, password}
        })
    }
}
