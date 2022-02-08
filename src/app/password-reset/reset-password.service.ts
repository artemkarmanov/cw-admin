import {Injectable} from '@angular/core';
import {SocketMessagesService} from '../core/socket-messages.service';
import {Observable} from 'rxjs';

@Injectable()
export class ResetPasswordService {

    constructor(private messages: SocketMessagesService) {
    }

    reset$(email: string): Observable<unknown> {
        return this.messages.request$('startResetPassword', {email});
    }
}
