import {DatePipe} from "@angular/common";

export const billingTableConfig =
	{
		billingResultId: {
			title: 'ResultId'
		},
		error: {
			title: 'Error'
		},
		success: {
			title: 'Success'
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
			title: 'User Id'
		},
		billedAtEpoch: {
			title: 'Billed At',
			valuePrepareFunction: prepareDate
		}
	}

function prepareDate(anything: number): string | null {
	return new DatePipe('en-US')
		.transform(
			anything * 1000,
			"dd MMM YYYY hh:mm aa"
		)
}
