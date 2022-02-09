import {Injectable} from '@angular/core';
import {SocketMessagesService} from '../core/socket-messages.service';
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
}
