import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'cwb-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    public isLoggedIn$: Observable<boolean> = this.authService.isAuthorized$;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

}
