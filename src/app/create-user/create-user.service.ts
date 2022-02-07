import {Injectable} from '@angular/core';
import {EMPTY, Observable, pluck} from 'rxjs';
import {SocketMessagesService} from '../core/socket-messages.service';
import {ErrorHandlerService} from '../core/error-handler.service';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from '../core/auth.service';

@Injectable()
export class CreateUserService {

    constructor(
        private messages: SocketMessagesService,
        private error: ErrorHandlerService,
        private authService: AuthService
    ) {
    }

    public create$(email: string, password: string): Observable<string> {
        return this.messages.request$<{ token: string }>('newUser', {
            email,
            password
        }).pipe(
            catchError(e => {
                this.error.handle(e);
                return EMPTY;
            }),
            pluck('token'),
            tap(token => {
                this.authService.authorize(token)
            })
        );
    }
}