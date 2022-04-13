import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef, OnInit,
	ViewChild
} from '@angular/core';
import {StripeService} from './stripe.service';
import {filter, switchMap, tap} from 'rxjs/operators';
import {from, Observable} from 'rxjs';
import {environment} from '@env';
import {loadStripe, Stripe, StripeElements, StripePaymentElement} from '@stripe/stripe-js';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {UserState} from "@store/user.state";
import {Select} from "@ngxs/store";

@UntilDestroy()
@Component({
	selector: 'cwb-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [StripeService]
})
export class PaymentComponent implements OnInit, AfterViewInit {
	public loaded: boolean = false;
	@ViewChild('error') errorMessage?: ElementRef;
	@ViewChild('cardInfo') cardInfo?: ElementRef;
	@Select(UserState.stripeClientSecret) private clientSecret!: Observable<string>
	private card?: StripePaymentElement;
	private elementsInstance?: StripeElements;
	private stripe?: Stripe;

	constructor(
		private stripeService: StripeService,
		private cdr: ChangeDetectorRef
	) {
	}

	ngOnInit() {
		this.stripeService.getStripeClientSecret$()
	}

	ngAfterViewInit(): void {
		this.clientSecret.pipe(
			untilDestroyed(this),
			filter(Boolean),
			switchMap((clientSecret) => from(loadStripe(environment.stripe.pk)).pipe(
				filter(Boolean),
				tap((stripe: Stripe) => this.stripe = stripe),
				tap((StripeObj: Stripe) => {
					this.elementsInstance = StripeObj.elements({clientSecret})
					this.card = this.elementsInstance.create('payment')
					this.card.mount((this.cardInfo as ElementRef).nativeElement)
					this.card.on('ready', () => this.toggleLoaded())
				})
			))
		).subscribe()
	}

	private toggleLoaded() {
		this.loaded = true
		this.cdr.markForCheck()
	}

	public submit(event: Event) {
		event.preventDefault();
		if (!this.stripe || !this.elementsInstance) return

		from(this.stripe.confirmSetup({
			elements: this.elementsInstance,
			confirmParams: {
				return_url: environment.stripe.complete
			}
		})).subscribe((res) => {
			if (res.error?.message) {
				this.errorMessage!.nativeElement.textContent = res.error.message
			}
		})
	}
}
