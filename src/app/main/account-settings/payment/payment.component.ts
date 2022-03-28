import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy, OnInit,
    ViewChild
} from '@angular/core';
import {StripeService} from './stripe.service';
import {filter, switchMap, tap} from 'rxjs/operators';
import {from, Subject, takeUntil} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {loadStripe, Stripe, StripeElements, StripePaymentElement} from '@stripe/stripe-js';
import {ConfirmationService} from 'src/app/shared/confirmation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IBackFromStripe} from "../back-from-stripe.interface";

@Component({
    selector: 'cwb-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [StripeService]
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {
    public bouncedBack: boolean = false;
    private destroy$$: Subject<void> = new Subject<void>();
    private card?: StripePaymentElement;
    private elementsInstance?: StripeElements;
    private stripe?: Stripe;
    @ViewChild('error') errorMessage?: ElementRef;
    @ViewChild('cardInfo') cardInfo?: ElementRef;

    constructor(
        private stripeService: StripeService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        const bouncedBack = this.route.snapshot.queryParams as IBackFromStripe
        if (
          bouncedBack.setup_intent &&
          bouncedBack.setup_intent_client_secret &&
          bouncedBack.redirect_status
        ) {
            this.bouncedBack = true
        }
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    // I want to keep the credit card form (hidden) on the same
    // page as the user info form, just to make things easier to manage.
    // After the user displays the credit card form, and clicks "Save",
    // I want to reload 'account-settings' so it goes back  to default
    // (the credit card form hidden, the user info displaying)
    redirectTo(uri:string){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate([uri]));
     }

    ngAfterViewInit(): void {
        this.stripeService.getStripeClientSecret$().pipe(
          takeUntil(this.destroy$$.asObservable()),
          switchMap((clientSecret) => from(loadStripe(environment.stripe.pk)).pipe(
            filter(Boolean),
            tap((stripe: Stripe) => this.stripe = stripe),
            tap((StripeObj: Stripe) => {
                this.elementsInstance = StripeObj.elements({clientSecret})
                this.card = this.elementsInstance.create('payment');
                this.card.mount((this.cardInfo as ElementRef).nativeElement);
            })
          )),
        ).subscribe();
    }

    savePaymentSettings() {
        // this will send the  payment info to a database to be saved,
        // then return the user to the account-settings screen
        let paymentDetailsAreCorrect = true;
        if (paymentDetailsAreCorrect) {
            this.confirmationService.open$("Payment details have been saved")
        } else {
            this.confirmationService.open$("Those payment details are incorrect")
        }
        this.redirectTo('/account-settings');
    }


    public submit(event: Event) {
        event.preventDefault();
        if (!this.stripe || !this.elementsInstance) return

        from(this.stripe.confirmSetup({
            elements: this.elementsInstance,
            confirmParams: {
                return_url: environment.stripe.complete
            }
        }))
            .subscribe((res) => {
                if (res.error?.message) {
                    this.errorMessage!.nativeElement.textContent = res.error.message
                }
            })
    }
}
