import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";
import {environment} from "@env";

@Component({
    selector: 'cwb-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
    public form: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required)
    });

    @Dispatch()
    public login() {
        const form = this.form.value
        const role = environment.role

        return new Send({
            type: MessageType.LogIn,
            data: {...form, role: role === 'booking' ? 'viewer' : role}
        })
    }
}
