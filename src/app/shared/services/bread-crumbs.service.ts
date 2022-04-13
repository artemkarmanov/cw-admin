import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, withLatestFrom} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {Select} from "@ngxs/store";
import {UserState} from "@store/user.state";

interface IBreadcrumb {
    title: string;
    path: string;
}

@Injectable({providedIn: 'root'})
export class BreadCrumbsService {
    @Select(UserState.logged) private isAuthorized$!: Observable<boolean>;
    private path$$: BehaviorSubject<IBreadcrumb[]> = new BehaviorSubject<IBreadcrumb[]>([]);
    public path$: Observable<IBreadcrumb[]> = this.path$$.asObservable().pipe(
        withLatestFrom(this.isAuthorized$),
        filter(([_, isAuthorized]) => {
            return isAuthorized
        }),
        map(([data]) => data)
    );

    public set(breadCrumbs: IBreadcrumb[]) {
        this.path$$.next(breadCrumbs);

    }
}
