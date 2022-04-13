import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ErrorHandlerService {
    private error$$: Subject<Error> = new Subject<Error>();

    constructor() {
    }

    public handle(error: Error | string) {
        typeof error === 'string'
            ? this.error$$.next(new Error(error))
            : this.error$$.next(error);
        console.error(error);
    }

    public listen$(): Observable<Error> {
        return this.error$$.asObservable();
    }
}
