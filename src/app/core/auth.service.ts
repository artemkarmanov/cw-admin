import {Inject, Injectable, OnDestroy} from '@angular/core';
import {
    BehaviorSubject,
    EMPTY,
    Observable,
    of,
    ReplaySubject,
    Subject,
    switchMap,
    takeUntil,
    withLatestFrom
} from 'rxjs';
import {catchError, filter, map, tap} from 'rxjs/operators';
import {SocketMessagesService} from './socket-messages.service';
import {ErrorHandlerService} from './error-handler.service';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {USER_INFO} from './const';
import {ILoginResponse, IUserSettings} from './types';
import {environment} from '../../environments/environment';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

@Injectable()
export class AuthService implements OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private authorization$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isAuthorized$: Observable<boolean> = this.authorization$$.asObservable().pipe(
        //distinctUntilChanged()
    );
    private loadUserSettings$$: Subject<void> = new Subject<void>();
    private userData$$: ReplaySubject<IUserSettings> = new ReplaySubject<IUserSettings>(1);
    public userSettings$: Observable<IUserSettings> = this.userData$$.asObservable();

    constructor(
        private messages: SocketMessagesService,
        private errorHandlerService: ErrorHandlerService,
        @Inject(LOCAL_STORAGE) private tokenStorage: StorageService,
        @Inject(USER_INFO) private userStorage: StorageService,
    ) {
        this.loadUserSettings$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(() => {
                return this.messages.request$<IUserSettings>('getUserSettings');
            }),
            tap(this.userData$$.next.bind(this.userData$$))
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    public authorize(token: string): void {
        this.setAppToken(token);
        this.authorization$$.next(true);
    }


    public login$(email: string, password: string): Observable<unknown> {
        const role = environment.role;
        return this.messages.request$<ILoginResponse>('login', {email, password, role}).pipe(
            tap((data) => {
                const {loginToken} = data;
                this.authorize(loginToken);
                this.userStorage.set(USER_KEY, {email});
            }),
            tap(() => this.loadUserSettings()),
            catchError((err) => {
                this.errorHandlerService.handle(err);
                return EMPTY;
            })
        );
    }

    public reLogin$(): Observable<boolean> {
        const loginToken = this.getAppToken();
        if (!loginToken) {
            return of(false);
        }

        return this.messages.request$<ILoginResponse>('reLogin', {loginToken}).pipe(
            tap((data) => {
                const {loginToken} = data;
                this.authorize(loginToken);
            }),
            map(() => true),
            tap(() => this.loadUserSettings()),
            catchError(() => {
                this.clearLocalData();
                return of(false);
            }),
            tap((result) => {
                this.authorization$$.next(result);
            }),
        );
    }

    public logout$(): Observable<void> {
        return of(null).pipe(
            withLatestFrom(this.isAuthorized$, (_, isAuthorized) => isAuthorized),
            filter((_) => !!_),
            switchMap(() => {
                return this.messages.request$('logout');
            }),
            tap(() => {
                this.clearLocalData();
            }),
            tap(() => {
                this.authorization$$.next(false);
            }),
            map(() => void 0)
        );
    }

    public loadUserSettings(): void {
        this.loadUserSettings$$.next();
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
