import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from '@services/auth.service';
import {Observable} from 'rxjs';
import {environment} from '@env';

@Component({
    selector: 'cwb-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    public isLoggedIn$: Observable<boolean> = this.authService.isAuthorized$;
    public isAdmin = environment.role === 'admin';

    constructor(private authService: AuthService) {
    }
}
