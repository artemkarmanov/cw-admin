import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {of, switchMap, take} from 'rxjs';
import {UsersService} from '@services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IBackFromStripe} from "../back-from-stripe.interface";
import {ConfirmationService} from "@services/confirmation.service";
import {IUserSettings} from "@interfaces/user.interfaces";
import {UserState} from "@store/user.state";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";

@Component({
    selector: 'cwb-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsComponent implements OnInit {
    public form: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        timeZone: new FormControl('', [Validators.required]),
    })
    public showCreditCardForm: boolean = false
    @SelectSnapshot(UserState.userInfo) public userSettings!: IUserSettings

    constructor(
        private usersService: UsersService,
        public router: Router,
        public route: ActivatedRoute,
        public confirmationService: ConfirmationService
    ) {
    }

    ngOnInit(): void {
        this.form.patchValue({...this.userSettings})

        const {
            setup_intent,
            setup_intent_client_secret,
            redirect_status
        } = this.route.snapshot.queryParams as IBackFromStripe

        if (setup_intent && setup_intent_client_secret) {
            of(redirect_status)
                .pipe(
                    take(1),
                    switchMap((status) => status === 'succeeded'
                        ? this.confirmationService.open$("Payment details have been saved")
                        : this.confirmationService.open$("Those payment details are incorrect")
                    )
                )
                .pipe(
                    switchMap(() => this.router.navigate(['account-settings']))
                )
                .subscribe()
        }
    }

    save() {
        const newData = {...this.userSettings, ...this.form.value}

        this.usersService.update$(newData)
    }

    showPaymentSettingForm() {
        this.showCreditCardForm = true;
    }
}
