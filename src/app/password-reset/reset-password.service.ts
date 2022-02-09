import {Injectable} from '@angular/core';
import {SocketMessagesService} from '../core/socket-messages.service';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from '../core/error-handler.service';

@Injectable()
export class ResetPasswordService {

    constructor(private messages: SocketMessagesService, private errorHandler: ErrorHandlerService) {
    }

    reset$(email: string): Observable<unknown> {
        return this.messages.request$('startResetPassword', {email}).pipe(
            catchError((e) => {
                this.errorHandler.handle(e);
                return EMPTY;
            })
        );
    }
}
