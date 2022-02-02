import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {SocketMessagesService} from './socket-messages.service';
import {ErrorHandlerService} from './error-handler.service';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {USER_INFO} from './const';
import {ILoginResponse, IReLoginResponse} from './types';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

@Injectable()
export class AuthService {
    private authorization$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isAuthorized$: Observable<boolean> = this.authorization$$.asObservable();

    constructor(
        private messages: SocketMessagesService,
        private errorHandlerService: ErrorHandlerService,
        @Inject(LOCAL_STORAGE) private tokenStorage: StorageService,
        @Inject(USER_INFO) private userStorage: StorageService,
    ) {
    }


    public login$(email: string, password: string): Observable<unknown> {

        return this.messages.request$<ILoginResponse>('login', {email, password}).pipe(
            tap((data) => {
                const {Token: token} = data;
                this.setAppToken(token);
                this.userStorage.set(USER_KEY, {email});
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

    public reLogin$(): Observable<boolean> {
        const token = this.getAppToken();
        if (!token) {
            return of(false);
        }

        return this.messages.request$<IReLoginResponse>('reLogin', {token}).pipe(
            map(() => true),
            catchError(() => {
                this.clearLocalData();
                return of(false);
            }),
            tap((result) => {
                this.authorization$$.next(result);
            }),
            tap(() => {

            })
        );
    }

    private getAppToken(): string | null {
        const hasToken = this.tokenStorage.has(TOKEN_KEY);
        return hasToken ? this.tokenStorage.get(TOKEN_KEY) : null;
    }

    private setAppToken(token: string): void {
        this.tokenStorage.set(TOKEN_KEY, token);
    }

    private clearLocalData(): void {
        this.tokenStorage.clear();
        this.userStorage.clear();
    }

}
