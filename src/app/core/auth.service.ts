import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {SocketMessagesService} from './socket-messages.service';

@Injectable()
export class AuthService {
    private authStatusChange$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private messages: SocketMessagesService) {
    }

    isLoggedIn$(): Observable<boolean> {
        return this.authStatusChange$$.asObservable();
    }

    public login$(user_id: string, password: string): Observable<unknown> {

        return this.messages.request$<any>('login', {user_id, password}).pipe(
            tap(({
                     bookeng_app_token,
                     billing_entity_id,
                     email,
                     first_name,
                     last_name,
                     org_id,
                     sys_admin,
                     time_zone,
                     theme
                 }) => {
                if (!bookeng_app_token) {
                    //throw new LoginError('No app_token provided');
                    throw new Error('No app_token provided');
                }
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
            tap(() => this.authStatusChange$$.next(true)),

            catchError((err) => {
                //this.error.handleError(err);

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
    //             this.authStatusChange$$.next(result);
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
