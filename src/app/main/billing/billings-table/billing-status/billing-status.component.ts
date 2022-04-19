import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {ViewCell} from "ng2-smart-table";
import {IBilling} from "@interfaces/billing.interfaces";

@Component({
  selector: 'cwb-billing-status',
  templateUrl: './billing-status.component.html',
  styleUrls: ['./billing-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingStatusComponent implements ViewCell {
  @Input() value: any
  @Input() rowData!: IBilling
}
