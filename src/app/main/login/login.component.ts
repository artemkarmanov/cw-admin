import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from '../../core/auth.service';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'cwb-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();

    private loginClick$$: Subject<void> = new Subject<void>();

    constructor(private authService: AuthService) {
        this.loginClick$$.asObservable().pipe(
            switchMap(() => {
                return this.authService.login$('test@example.org', 'test321');
            })
        ).subscribe();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }


    public login(): void {
        this.loginClick$$.next();
    }

}
