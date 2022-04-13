import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject, takeUntil} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {Select} from "@ngxs/store";
import {UserState} from "@store/user.state";

@Component({
    selector: 'cwb-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    @Select(UserState.logged) public isAuthorized$!: Observable<boolean>
    private pageHasSimpleLayout$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public pageHasSimpleLayout$: Observable<boolean> = this.pageHasSimpleLayout$$.asObservable();

    constructor(private router: Router) {
        this.router.events.pipe(
            takeUntil(this.destroy$$.asObservable()),
            filter(event => event instanceof NavigationEnd),
            map((_) => (_ as NavigationEnd).url),
            map(_ => {
                return [
                    '/users/',
                    '/bookings/create',
                    '/account-settings'
                ].some(url => _.startsWith(url));
            }),
            tap(this.pageHasSimpleLayout$$.next.bind(this.pageHasSimpleLayout$$))
        ).subscribe();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

}
