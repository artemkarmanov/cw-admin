import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, switchMap, takeUntil} from 'rxjs';
import {AuthService} from '../../../core/auth.service';
import {tap} from 'rxjs/operators';
import {UsersService} from '../../../core/users.service';
import {INewUser, IUser, IUserSettings} from '../../../core/types';
import { Router } from '@angular/router';

@Component({
    selector: 'cwb-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private save$$: Subject<void> = new Subject<void>();
    public form: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        timeZone: new FormControl('', [Validators.required]),
    })

    // Making this zero here, but it will be fetched from the backend and re-assigned
    // a value in ngOnInit()
    public paymentMethodComplete: number = 0;

    // This component now contains a user  info form, as well as a credit
    // card input form (hidden by default).  Everytime the page loads,
    // we'll hide the credit card form, using this boolean flag
    public showCreditCardForm: boolean = false;

    constructor(private auth: AuthService, private usersService: UsersService, public router: Router) {
    }

    ngOnInit(): void {
        this.auth.userSettings$.pipe(
            takeUntil(this.destroy$$.asObservable()),
            tap((data) => {
                this.form.patchValue(data);
                this.paymentMethodComplete = data.paymentMethodComplete
            })
        ).subscribe();
        this.save$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(() => this.auth.userSettings$),
            switchMap((oldUserData) => {
                const oldData = JSON.parse(JSON.stringify(oldUserData)) as IUserSettings;
             
                const newData = this.form.value as INewUser;
                const data: Partial<IUser> = {};
                if (newData.firstName !== oldData.firstName) {
                    data.firstName = newData.firstName;
                }
                if (newData.lastName !== oldData.lastName) {
                    data.lastName = newData.lastName;
                }
                if (newData.timezone !== oldData.timeZone) {
                    data.timezone = newData.timezone;
                }
                if (newData.email !== oldData.email) {
                    data.email = newData.email;
                }
                if (newData.paymentMethodComplete !== oldData.paymentMethodComplete) {
                    data.paymentMethodComplete = newData.paymentMethodComplete;
                }
                return this.usersService.update$(data);
            })
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    save() {
        if (this.form.valid) {
            this.save$$.next();
        }

    }

    showPaymentSettingForm()  {
        this.showCreditCardForm = true;
    }
}
