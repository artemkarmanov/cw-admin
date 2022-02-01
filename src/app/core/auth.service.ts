import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {SocketMessagesService} from './socket-messages.service';
import {ErrorHandlerService} from './error-handler.service';

@Injectable()
export class AuthService {
    private authorization$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isAuthorized$: Observable<boolean> = this.authorization$$.asObservable();

    constructor(
        private messages: SocketMessagesService,
        private errorHandlerService: ErrorHandlerService
    ) {
    }


    public login$(email: string, password: string): Observable<unknown> {

        return this.messages.request$<any>('login', {email, password}).pipe(
            tap((data) => {
                console.log(data);
                // if (!bookeng_app_token) {
                //     //throw new LoginError('No app_token provided');
                //     throw new Error('No app_token provided');
                // }
                //this.token.set(bookeng_app_token);
                // this.user.set({
                //     billing_entity_id,
                //     email,
                //     first_name,
                //     last_name,
                //     org_id,
                //     sys_admin,
                //     time_zone,
                //     theme
                //
                // });
            }),
            tap(() => this.authorization$$.next(true)),

            catchError((err) => {
                this.errorHandlerService.handle(err);
                return EMPTY;
            }),
            tap(() => {

            }),
        );
    }

    // public reLogin$(): Observable<boolean> {
    //     if (!this.hasAppToken()) {
    //         return of(false);
    //     }
    //
    //     const bookeng_app_token = this.token.get() as string;
    //     return this.messages.request$<IAuthResponse>('reLogin', {bookeng_app_token}).pipe(
    //         tap((data: IAuthResponse) => this.user.set(data)),
    //         map(() => true),
    //         catchError(() => {
    //             this.token.empty();
    //             return of(false);
    //         }),
    //         tap((result) => {
    //             this.authorization$$.next(result);
    //         }),
    //         tap(() => {
    //             this.progress.stop();
    //         })
    //     );
    // }

    private hasAppToken(): boolean {
        return false;
    }
}
