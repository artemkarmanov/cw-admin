import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {from, Subject, takeUntil, withLatestFrom} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {UsersService} from '../../../core/users.service';
import {IUser} from '../../../core/types';
import {BreadCrumbsService} from '../../../core/bread-crumbs.service';

@Component({
    selector: 'cwb-edit-user-page',
    templateUrl: './edit-user-page.component.html',
    styleUrls: ['./edit-user-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserPageComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private save$$: Subject<IUser> = new Subject<IUser>();
    public user!: IUser;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private usersService: UsersService,
        private breadCrumbsService: BreadCrumbsService
    ) {
    }

    ngOnInit(): void {
        this.save$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(this.usersService.update$.bind(this.usersService)),
            tap(() => {
                this.usersService.reload();
            }),
            switchMap(() => {
                return from(this.router.navigate(['/users']))
            })
        ).subscribe();

        this.usersService.getUsers$().pipe(
            takeUntil(this.destroy$$.asObservable()),
            withLatestFrom(this.route.params, (users, params) => {
                const {id} = params;
                console.log(users, params)
                return users.filter(user => user.userId === parseInt(id));
            }),
            map((users) => {
                if (!users.length) throw new Error('User not found');
                return users.pop();
            }),
            filter(Boolean),
            tap(user => this.user = user),
            tap(user => {
                this.breadCrumbsService.set([
                    {
                        path: '/users',
                        title: 'Users'
                    },
                    {
                        title: ['Edit', user.firstName, user.lastName].join(' '),
                        path: ['users', user.userId].join('/')
                    }
                ])
            })
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    save(user: IUser) {
        this.save$$.next(user);
    }

}
