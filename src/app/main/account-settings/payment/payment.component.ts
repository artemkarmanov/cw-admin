import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {StripeService} from './stripe.service';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {from, Subject, takeUntil} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import { ConfirmationService } from 'src/app/shared/confirmation.service';
import { Router } from '@angular/router';

@Component({
    selector: 'cwb-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        StripeService
    ]
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    // can't use StripeCardElement
    private card: any;
    @ViewChild('cardInfo') cardInfo?: ElementRef;

    constructor(
        private stripeService: StripeService, 
        private confirmationService: ConfirmationService,
        private router: Router) {
    }

    ngOnInit(): void {

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
                // Will filter error !!!
                filter(Boolean),
                map(_ => _ as Stripe),
                tap(console.log),
                tap((StripeObj: Stripe) => {
                    this.card = StripeObj.elements({
                        clientSecret
                        /*fonts: [
                            {
                                cssSrc: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap'
                            }
                        ]*/
                    }).create('payment', /*{
                    style: {
                        base: {
                            color: '#ffffff',
                            fontFamily: '"Montserrat", sans-serif',
                            fontSmoothing: 'antialiased',
                            fontSize: '18px',
                            fontWeight: '600',
                            '::placeholder': {
                                color: '#84829D',
                                fontWeight: '600'
                            },
                        },
                        invalid: {
                            color: '#fa755a',
                            iconColor: '#fa755a',
                        },
                    }
                }*/);
                    this.card.mount((this.cardInfo as ElementRef).nativeElement);
                    //this.card.addEventListener('change', this.onChange.bind(this));
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

}
