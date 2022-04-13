import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UsersService} from '@services/users.service';
import {Router} from '@angular/router';
import {BreadCrumbsService} from '@services/bread-crumbs.service';
import {INewUser} from "@interfaces/user.interfaces";

@Component({
    selector: 'cwb-new-user-page',
    templateUrl: './new-user-page.component.html',
    styleUrls: ['./new-user-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserPageComponent implements OnInit {
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
    }

    save(newUserData: INewUser): void {
        this.usersService.create$(newUserData)
        this.router.navigate(['users']).then()
    }
}
