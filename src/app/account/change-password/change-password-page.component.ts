import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {checkPasswords} from "@helpers/check-passwords";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";

@Component({
    selector: 'cwb-change-password',
    templateUrl: './change-password-page.component.html',
    styleUrls: ['./change-password-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordPageComponent implements OnInit {
    public form: FormGroup = new FormGroup({
        password: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required)
    }, {
        validators: checkPasswords()
    })
    private passwordChangeToken!: string;
    private email!: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const {passwordChangeToken, email} = this.route.snapshot.queryParams
        this.passwordChangeToken = passwordChangeToken
        this.email = email
    }

    @Dispatch()
    public change() {
        return new Send({
            type: MessageType.ChangePassword,
            data: {
                email: this.email,
                changePasswordToken: this.passwordChangeToken,
                password: this.form.controls['password'].value
            }
        })
    }
}
