import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {checkPasswords} from '../../../core/utils';
import {IAdminUser} from '../../../core/types';

@Component({
    selector: 'cwb-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {
    public form: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
        timeZone: new FormControl('', [Validators.required]),
        isAdmin: new FormControl('0', [Validators.required]),
        isCaptioner: new FormControl('0', [Validators.required]),
    }, {
        validators: checkPasswords()
    })

    constructor() {
    }

    @Input()
    set data(user: IAdminUser) {
        this.form.setValue(user);
    }

    ngOnInit(): void {
    }

    save() {

    }
}
