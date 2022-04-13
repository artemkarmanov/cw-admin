import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {UsersService} from '@services/users.service';
import {BreadCrumbsService} from '@services/bread-crumbs.service';
import {IUser} from "@interfaces/user.interfaces";
import {UntilDestroy} from "@ngneat/until-destroy";
import {Select} from "@ngxs/store";
import {UsersState} from "@store/users.state";

@UntilDestroy()
@Component({
    selector: 'cwb-edit-user-page',
    templateUrl: './edit-user-page.component.html',
    styleUrls: ['./edit-user-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserPageComponent implements OnInit {
    public user$!: Observable<IUser>
    @Select(UsersState.users) private users$!: Observable<IUser[]>

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private usersService: UsersService,
        private breadCrumbsService: BreadCrumbsService
    ) {
    }

    ngOnInit(): void {
        const {id} = this.route.snapshot.params
        this.user$ = this.users$.pipe(
            map(users => users.find(user => user.userId === Number(id))!),
            tap((user) =>
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
            )
        )
    }

    save(user: IUser) {
        this.usersService.update$(user)
        this.router.navigate(['/', 'users']).then()
    }
}
