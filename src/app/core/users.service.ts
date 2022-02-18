import {Injectable} from '@angular/core';
import {SocketMessagesService} from './socket-messages.service';
import {BehaviorSubject, EMPTY, Observable, pluck, Subject, switchMap, takeWhile} from 'rxjs';
import {INewUser, IUser} from './types';
import {catchError, filter, tap} from 'rxjs/operators';
import {ErrorHandlerService} from './error-handler.service';

@Injectable()
export class UsersService {
    private isLoaded = false;
    private load$$: Subject<void> = new Subject<void>();
    private data$$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);


    constructor(
        private messages: SocketMessagesService,
        private error: ErrorHandlerService,
    ) {
        this.load$$.asObservable().pipe(
            takeWhile(() => !this.isLoaded),
            switchMap(() => {
                return this.messages.request$<{ users: IUser[] }>('getUsers');
            }),
            pluck('users'),
            tap(this.data$$.next.bind(this.data$$)),
            tap(() => this.isLoaded = true)
        ).subscribe();
    }

    getUsers$(): Observable<IUser[]> {
        this.load$$.next();
        return this.data$$.asObservable().pipe(
            filter(_ => !!_.length)
        );
    }

    public create$(newUserData: INewUser): Observable<string> {
        return this.messages.request$<{ token: string }>('newUser', newUserData).pipe(
            catchError(e => {
                this.error.handle(e);
                return EMPTY;
            }),
            pluck('token'),
        );
    }

    public update$(userData: IUser): Observable<unknown> {
        return this.messages.request$<unknown>('updateUser', userData).pipe(
            catchError(e => {
                this.error.handle(e);
                return EMPTY;
            }),
        );
    }

    public reload() {
        this.isLoaded = false;
        this.load$$.next();
    }
}
