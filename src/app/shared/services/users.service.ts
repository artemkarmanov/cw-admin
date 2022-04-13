import {Injectable} from '@angular/core';
import {INewUser, IUser} from "@interfaces/user.interfaces";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";

@Injectable({providedIn: 'root'})
export class UsersService {
    @Dispatch()
    public load$() {
        return new Send({
            type: MessageType.GetUsers
        })
    }

    @Dispatch()
    public create$(newUserData: INewUser) {
        return new Send({
            type: MessageType.NewUser,
            data: newUserData
        })
    }

    @Dispatch()
    public update$(userData: Partial<IUser>) {
        return new Send({
            type: MessageType.UpdateUser,
            data: userData
        })
    }
}
