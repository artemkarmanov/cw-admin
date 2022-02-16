import {Injectable} from '@angular/core';
import {SocketMessagesService} from './socket-messages.service';
import {Observable, pluck, ReplaySubject, Subject, switchMap, takeWhile} from 'rxjs';
import {IUser} from './types';
import {tap} from 'rxjs/operators';

@Injectable()
export class UsersService {
    private isLoaded = false;
    private load$$: Subject<void> = new Subject<void>();
    private data$$: ReplaySubject<IUser[]> = new ReplaySubject<IUser[]>(1);


    constructor(private messages: SocketMessagesService) {
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
        return this.data$$.asObservable();
    }
}
