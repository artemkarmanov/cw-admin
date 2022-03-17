import {Injectable} from '@angular/core';
import {SocketMessagesService} from '../core/socket-messages.service';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from '../core/error-handler.service';

@Injectable()
export class ResetPasswordService {

    constructor(private messages: SocketMessagesService, private errorHandler: ErrorHandlerService) {
    }

    reset$(email: string, site: string): Observable<unknown> {
        // Just checking if the site param came through okay here.
        console.log(site)
        return this.messages.request$('startResetPassword', {email, site}).pipe(
            catchError((e) => {
                this.errorHandler.handle(e);
                return EMPTY;
            })
        );
    }
}
