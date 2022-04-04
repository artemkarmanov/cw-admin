import {AdjustTimePipe} from "@pipes/adjust-time.pipe";
import {Injector} from "@angular/core";
import {AsyncPipe} from "@angular/common";
import {BookingLinkComponent} from "./bookings-table/booking-link/booking-link.component";

export const bookingsTableConfig = {
	bookingToken: {
		title: 'Booking ID',
		width: '130px',
		type: 'custom',
		renderComponent: BookingLinkComponent
	},
	title: {
		title: 'Title'
	},
	nextSessionStartEpoch: {
		title: 'Next session',
		valuePrepareFunction: prepareDate,
		width: '211px'
	},
	nextSessionDurationMins: {
		title: 'Duration',
		width: '110px'
	},
	totalSessions: {
		title: 'Total',
		width: '90px'
	},
	countFutureSessions: {
		title: 'Future Sessions',
		width: '160px'
	}
}

function prepareDate(date: number) {
	const injector = Injector.create({
		providers: [
			{provide: AdjustTimePipe},
			{provide: AsyncPipe}
		]
	})

	return injector
		.get(AsyncPipe)
		.transform(injector.get(AdjustTimePipe).transform(date))
}
