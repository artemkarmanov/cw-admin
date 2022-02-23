import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {BehaviorSubject, Observable, Subject, takeUntil} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';

@Component({
    selector: 'cwb-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    public isAuthorized$: Observable<boolean> = this.authService.isAuthorized$;
    private pageHasSimpleLayout$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public pageHasSimpleLayout$: Observable<boolean> = this.pageHasSimpleLayout$$.asObservable();

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
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
