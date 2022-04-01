import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from 'src/app/shared/services/users.service';
import {checkPasswords} from "@helpers/check-passwords";
import {IUser} from "@interfaces/user.interfaces";

@Component({
    selector: 'cwb-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {
    @Output() dataChange = new EventEmitter<any>();

    public form: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
        timeZone: new FormControl('', [Validators.required]),
        isAdmin: new FormControl(false, [Validators.required]),
        isCaptioner: new FormControl(false, [Validators.required]),
        respeakerRate: new FormControl('', [Validators.required]),
    }, {
        validators: checkPasswords()
    })

    public thisUserId: number = 0;

    @Input()
    set data(user: IUser) {
        if (user) {
            this.thisUserId = user.userId;
            this.form.removeControl('password');
            this.form.removeControl('password2');
            this.form.removeValidators(checkPasswords());
            this.form.updateValueAndValidity({emitEvent: false});
            this.form.patchValue(Object.assign({}, user, {password: '', password2: ''}), {emitEvent: false});
        }

    }

    constructor(private usersService: UsersService) {
    }


    ngOnInit(): void {
    }

    save() {
        if (this.form.valid) {
            const data = this.form.value;
            delete data.password2;
            Object.assign(data, {
                isAdmin: (data.isAdmin) ? 1 : 0,
                isCaptioner: (data.isCaptioner) ? 1 : 0,
                // The respeaker rate should be a float, but it comes from the
                // form as a string, so I change it to a float here
                respeakerRate: parseFloat(data.respeakerRate)
            })
            // When a user is being created, the thisUserId will be initialized
            // to 0. In that case, we don't want  to send that data to the backend,
            // so this "if" statement checks if it's over zero, and adds it to the 
            // data for the backend if  it is.

            // The reason is because this form component is used for both 
            // creating as well  as updating users.

            // In case we're  creating users, we want to not send the userId (0).
            // In case we're updating a user, we DEFINITELY NEED to send the userId
            // (or else the incorrect user gets updated).
            if (this.thisUserId > 0) {
                Object.assign(data, {
                    userId: this.thisUserId
                })
            }
            // this dataChange expression doesn't seem to be doing anything,
            // but I'll leave it here anyway.  The main problem is, the list of users
            // is not updating once a user clicks "Save", so I added the final "this.userService.reload()"
            // line in this function.  It reloads the user service, grabbing all the 
            // newest users from the DB and displaying them.
            console.log(data)
            this.dataChange.emit(data);
            this.usersService.reload();
        }
    }
}
