import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from './reset-password.service';
import {from, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'cwb-password-reset',
    templateUrl: './password-reset-page.component.html',
    styleUrls: ['./password-reset-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ResetPasswordService
    ]
})
export class PasswordResetPageComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private send$$: Subject<string> = new Subject<string>();
    public form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
    });

    public role = environment.role;

    constructor(
        private resetPasswordService: ResetPasswordService, private router: Router) {
    }

    ngOnInit(): void {
        this.send$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            tap((email) => this.resetPasswordService.reset$(email, this.role)),
            switchMap(() => from(this.router.navigate(['/'])))
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    public reset() {
        if (this.form.valid) {
            this.send$$.next(this.form.get('email')?.value as string);
        }
    }

}
