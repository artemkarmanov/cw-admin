import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {checkPasswords} from '../../../core/utils';
import {IUser} from '../../../core/types';

@Component({
    selector: 'cwb-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {
    @Output() dataChange = new EventEmitter<any>();

    @Input()
    set data(user: IUser) {
        this.form.setValue(user);
    }

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


    ngOnInit(): void {
    }

    save() {
        if (this.form.valid) {
            const data = this.form.value;

            this.dataChange.emit(data);
        }
    }
}
