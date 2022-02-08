import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ResetPasswordService} from './reset-password.service';

@Component({
    selector: 'cwb-password-reset',
    templateUrl: './password-reset-page.component.html',
    styleUrls: ['./password-reset-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ResetPasswordService
    ]
})
export class PasswordResetPageComponent implements OnInit {
    public email: FormControl = new FormControl('', [Validators.required, Validators.email]);

    constructor(private resetPasswordService: ResetPasswordService) {
    }

    ngOnInit(): void {
    }

    public reset() {

    }

}
