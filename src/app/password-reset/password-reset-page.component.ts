import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ResetPasswordService} from './reset-password.service';
import {Subject, switchMap, takeUntil} from 'rxjs';

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
    public email: FormControl = new FormControl('', [Validators.required, Validators.email]);

    constructor(private resetPasswordService: ResetPasswordService) {
    }

    ngOnInit(): void {
        this.send$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap((email) => this.resetPasswordService.reset$(email))
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    public reset() {
        if (this.email.valid) {
            this.send$$.next(this.email.value);
        }
    }

}
