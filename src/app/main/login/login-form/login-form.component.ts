import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/auth.service';
import {switchMap} from 'rxjs/operators';

interface IUserCredentials {
    email: string;
    password: string;
}

@Component({
    selector: 'cwb-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();

    private loginClick$$: Subject<void> = new Subject<void>();
    public form: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required)
    });

    constructor(private authService: AuthService) {
        this.loginClick$$.asObservable().pipe(
            switchMap(() => {
                const {email, password} = this.form.value as IUserCredentials;
                return this.authService.login$(email, password);
            })
        ).subscribe();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }


    public login(): void {
        if (this.form.valid) {
            this.loginClick$$.next();
        }

    }

}
