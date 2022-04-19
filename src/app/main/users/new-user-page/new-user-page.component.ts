import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UsersService} from '@services/users.service';
import {Router} from '@angular/router';
import {INewUser} from "@interfaces/user.interfaces";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {SetBreadcrumbs} from "@store/breadcrumbs.actions";

@Component({
    selector: 'cwb-new-user-page',
    templateUrl: './new-user-page.component.html',
    styleUrls: ['./new-user-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserPageComponent implements OnInit {
    constructor(
        private usersService: UsersService,
        private router: Router
    ) {
    }

    @Dispatch()
    ngOnInit() {
        return new SetBreadcrumbs([
            {title: 'Users', path: '/users'},
            {title: 'New user'}]
        )
    }

    save(newUserData: INewUser): void {
        this.usersService.create$(newUserData)
        this.router.navigate(['users']).then()
    }
}
