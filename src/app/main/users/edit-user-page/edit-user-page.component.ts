import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {from, Subject, withLatestFrom} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {UsersService} from '@services/users.service';
import {BreadCrumbsService} from '@services/bread-crumbs.service';
import {IUser} from "@interfaces/user.interfaces";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'cwb-edit-user-page',
    templateUrl: './edit-user-page.component.html',
    styleUrls: ['./edit-user-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserPageComponent implements OnInit {
    public user!: IUser;
    private save$$: Subject<IUser> = new Subject<IUser>();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private usersService: UsersService,
        private breadCrumbsService: BreadCrumbsService
    ) {
    }

    ngOnInit(): void {
        this.save$$.asObservable()
            .pipe(
                untilDestroyed(this),
                switchMap(this.usersService.update$.bind(this.usersService)),
                tap(() => this.usersService.reload()),
                switchMap(() => from(this.router.navigate(['/users'])))
            )
            .subscribe();

        this.usersService.getUsers$()
            .pipe(
                untilDestroyed(this),
                withLatestFrom(this.route.params, (users, {id}) => users.filter(user => user.userId === parseInt(id))),
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
            )
            .subscribe();
    }

    save(user: IUser) {
        this.save$$.next(user);
    }

}
