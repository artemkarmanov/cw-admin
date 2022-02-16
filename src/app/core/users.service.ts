import {Injectable} from '@angular/core';
import {SocketMessagesService} from './socket-messages.service';
import {Observable, pluck, ReplaySubject, Subject, switchMap, takeWhile} from 'rxjs';
import {IAdminUser} from './types';
import {tap} from 'rxjs/operators';

@Injectable()
export class UsersService {
    private isLoaded = false;
    private load$$: Subject<void> = new Subject<void>();
    private data$$: ReplaySubject<IAdminUser[]> = new ReplaySubject<IAdminUser[]>(1);


    constructor(private messages: SocketMessagesService) {
        this.load$$.asObservable().pipe(
            takeWhile(() => !this.isLoaded),
            switchMap(() => {
                return this.messages.request$<{ users: IAdminUser[] }>('getUsers');
            }),
            pluck('users'),
            tap(this.data$$.next.bind(this.data$$)),
            tap(() => this.isLoaded = true)
        ).subscribe();
    }

    getUsers$(): Observable<IAdminUser[]> {
        this.load$$.next();
        return this.data$$.asObservable();
    }
}
