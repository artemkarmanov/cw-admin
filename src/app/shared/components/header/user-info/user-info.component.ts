import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from '@services/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'cwb-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements OnInit {
    public user$: Observable<string> = this.auth.userSettings$.pipe(
        map(userData => {
            if (!userData.firstName && !userData.lastName) {
                return 'Unknown user';
            } else {
                return [userData.firstName, userData.lastName].join(' ');
            }
        })
    );

    constructor(private auth: AuthService) {
    }

    ngOnInit(): void {
    }

}
