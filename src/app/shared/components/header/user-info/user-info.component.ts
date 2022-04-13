import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Select} from "@ngxs/store";
import {UserState} from "@store/user.state";
import {IUserSettings} from "@interfaces/user.interfaces";

@Component({
    selector: 'cwb-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements OnInit {
    @Select(UserState.userInfo) public user$!: Observable<IUserSettings>

    ngOnInit(): void {
    }

}
