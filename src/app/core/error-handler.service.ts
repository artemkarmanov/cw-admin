import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class ErrorHandlerService {
    private error$$: Subject<Error> = new Subject<Error>();

    constructor() {
    }

    public handle(error: Error) {
        this.error$$.next(error);
        console.error(error);
    }

    public listen$(): Observable<Error> {
        return this.error$$.asObservable();
    }
}
