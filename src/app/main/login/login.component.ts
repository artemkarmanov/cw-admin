import {ChangeDetectionStrategy, Component} from '@angular/core';


@Component({
    selector: 'cwb-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    constructor() {

    }
}
