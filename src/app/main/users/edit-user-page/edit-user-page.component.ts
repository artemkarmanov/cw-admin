import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, of, switchMap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {UsersService} from '@services/users.service';
import {IUser} from "@interfaces/user.interfaces";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Select} from "@ngxs/store";
import {UsersState} from "@store/users.state";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {SetBreadcrumbs} from "@store/breadcrumbs.actions";

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
        private usersService: UsersService
    ) {
    }

    @Dispatch()
    ngOnInit() {
        const {id} = this.route.snapshot.params

        this.user$ = this.users$
            .pipe(
                untilDestroyed(this),
                map(
                    users => users.find(
                        user => user.userId === Number(id)
                    )!
                )
            )

        return this.user$
            .pipe(
                switchMap((user: IUser) => of(new SetBreadcrumbs([
                    {title: 'Users', path: '/users'},
                    {title: ['Edit', user.firstName, user.lastName].join(' ')}
                ])))
            )
    }

    save(user: IUser) {
        this.usersService.update$(user)
        this.router.navigate(['/', 'users']).then()
    }
}
