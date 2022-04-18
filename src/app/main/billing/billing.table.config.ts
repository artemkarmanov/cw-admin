import {DatePipe} from "@angular/common";
import {BillingStatusComponent} from "./billings-table/billing-status/billing-status.component";

export const billingTableConfig = {
	billingResultId: {
		title: 'Result ID',
		width: '110px'
	},
	success: {
		title: 'Status',
		type: 'custom',
		renderComponent: BillingStatusComponent,
		valuePrepareFunction: (success: number) => {
			return success || 0
		},
		width: '120px',
		filter: {
			type: 'list',
			config: {
				selectText: 'All',
				list: [
					{value: '1', title: 'Success'},
					{value: '0', title: 'Error'}
				],
			},
		}
	},
	totalBill: {
		title: 'Total Bill'
	},
	firstName: {
		title: 'First Name'
	},
	lastName: {
		title: 'Last Name'
	},
	email: {
		title: 'Email'
	},
	userId: {
		title: 'User Id',
		width: '100px'
	},
	billedAtEpoch: {
		title: 'Billed At',
		valuePrepareFunction: prepareDate,
		width: '256px'
	}
}

function prepareDate(anything: number): string | null {
	return new DatePipe('en-US')
		.transform(
			anything * 1000,
			"dd MMM YYYY hh:mm aa"
		)
}
