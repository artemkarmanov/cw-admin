import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {INewUser} from '../../../core/types';
import {UsersService} from '../../../core/users.service';
import {from, Subject, switchMap, takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {BreadCrumbsService} from '../../../core/bread-crumbs.service';

@Component({
    selector: 'cwb-new-user-page',
    templateUrl: './new-user-page.component.html',
    styleUrls: ['./new-user-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserPageComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private save$$: Subject<INewUser> = new Subject();

    constructor(
        private usersService: UsersService,
        private router: Router,
        private breadCrumbsService: BreadCrumbsService
    ) {
    }

    ngOnInit(): void {
        this.breadCrumbsService.set([
            {
                path: '/users',
                title: 'Users'
            },
            {
                title: 'New user',
                path: ['users', 'create'].join('/')
            }
        ]);
        this.save$$.pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(this.usersService.create$.bind(this.usersService)),
            tap(() => {
                this.usersService.reload();
            }),
            switchMap(() => from(this.router.navigate(['/users'])))
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    save(newUserData: INewUser): void {
        this.save$$.next(newUserData)
    }

}
