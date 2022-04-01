import {ChangeDetectionStrategy, Component} from '@angular/core';
import {environment} from '@env';

@Component({
    selector: 'cwb-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    public isAdmin = environment.role === 'admin';
}
