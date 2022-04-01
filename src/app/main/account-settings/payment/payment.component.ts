import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild
} from '@angular/core';
import {StripeService} from './stripe.service';
import {filter, switchMap, tap} from 'rxjs/operators';
import {from, Subject, takeUntil} from 'rxjs';
import {environment} from '@env';
import {loadStripe, Stripe, StripeElements, StripePaymentElement} from '@stripe/stripe-js';

@Component({
    selector: 'cwb-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [StripeService]
})
export class PaymentComponent implements AfterViewInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private card?: StripePaymentElement;
    private elementsInstance?: StripeElements;
    private stripe?: Stripe;
    @ViewChild('error') errorMessage?: ElementRef;
    @ViewChild('cardInfo') cardInfo?: ElementRef;

    constructor(private stripeService: StripeService) {
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
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
