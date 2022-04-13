import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of, Subject, switchMap, take, takeUntil} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UsersService} from '@services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IBackFromStripe} from "../back-from-stripe.interface";
import {ConfirmationService} from "@services/confirmation.service";
import {INewUser, IUser, IUserSettings} from "@interfaces/user.interfaces";
import {Select} from "@ngxs/store";
import {UserState} from "@store/user.state";

@Component({
    selector: 'cwb-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsComponent implements OnInit, OnDestroy {
    @Select(UserState.userInfo) private userSettings$!: Observable<IUserSettings>
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

    constructor(
      private usersService: UsersService,
      public router: Router,
      public route: ActivatedRoute,
      public confirmationService: ConfirmationService
    ) {
    }

    ngOnInit(): void {
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
        this.userSettings$.pipe(
            takeUntil(this.destroy$$.asObservable()),
            tap((data) => {
                this.form.patchValue(data);
                this.paymentMethodComplete = data.paymentMethodComplete
            })
        ).subscribe();
        this.save$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(() => this.userSettings$),
            tap((oldUserData) => {
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
        this.save$$.next();
    }

    showPaymentSettingForm()  {
        this.showCreditCardForm = true;
    }
}
