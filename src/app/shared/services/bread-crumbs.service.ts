import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, withLatestFrom} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {AuthService} from './auth.service';

interface IBreadcrumb {
    title: string;
    path: string;
}

@Injectable({providedIn: 'root'})
export class BreadCrumbsService {
    private path$$: BehaviorSubject<IBreadcrumb[]> = new BehaviorSubject<IBreadcrumb[]>([]);
    public path$: Observable<IBreadcrumb[]> = this.path$$.asObservable().pipe(
        withLatestFrom(this.auth.isAuthorized$),
        filter(([_, isAuthorized]) => {
            return isAuthorized
        }),
        map(([data]) => data)
    );

    constructor(private auth: AuthService) {
    }

    public set(breadCrumbs: IBreadcrumb[]) {
        this.path$$.next(breadCrumbs);

    }

}
