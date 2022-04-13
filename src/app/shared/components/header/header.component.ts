import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '@env';
import {Relogin} from "@store/user.actions";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Select} from "@ngxs/store";
import {UserState} from "@store/user.state";

@Component({
    selector: 'cwb-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    @Select(UserState.logged) public isLoggedIn$!: Observable<boolean>
    public isAdmin = environment.role === 'admin';

    @Dispatch()
    ngOnInit() {
        return new Relogin()
    }
}
