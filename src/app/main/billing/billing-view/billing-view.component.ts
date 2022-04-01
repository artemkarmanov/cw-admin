import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BillingService} from "@services/billing.service";
import {Observable} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {IBillingDetails} from "@interfaces/billing.interfaces";

@Component({
  selector: 'cwb-billing-view',
  templateUrl: './billing-view.component.html',
  styleUrls: ['./billing-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BillingService]
})
export class BillingViewComponent implements OnInit {
  @Input() private billingResultId!: number
  public billing$!: Observable<IBillingDetails>

  constructor(
    private service: BillingService,
    private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.billing$ = this.service.billing$(this.billingResultId)
  }

  public close() {
    this.activeModal.close()
  }
}
