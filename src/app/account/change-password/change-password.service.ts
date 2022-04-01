import {Injectable} from '@angular/core';
import {SocketMessagesService} from '@services/socket-messages.service';
import {Observable} from 'rxjs';

@Injectable()
export class ChangePasswordService {

    constructor(private messages: SocketMessagesService) {
    }

    public checkResetPassword$(email: string, token: string): Observable<boolean> {
        return this.messages.request$<boolean>('checkResetPassword', {
            Email: email,
            Token: token
        })
    }

    public changePassword$(email: string, token: string, password: string): Observable<boolean> {
        return this.messages.request$<boolean>('changePassword', {
            Email: email,
            Token: token,
            Password: password
        })
    }
}
