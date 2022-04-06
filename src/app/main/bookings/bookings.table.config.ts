import {AdjustTimePipe} from "@pipes/adjust-time.pipe";
import {Injector} from "@angular/core";
import {AsyncPipe} from "@angular/common";
import {BookingLinkComponent} from "./bookings-table/booking-link/booking-link.component";
import {
	BookingSessionsRemainingComponent
} from "./bookings-table/booking-sessions-remaining/booking-sessions-remaining.component";
import {BookingOwnerComponent} from "./bookings-table/booking-owner/booking-owner.component";

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
		width: '110px',
		valuePrepareFunction: (data: number) => `${data} mins`
	},
	countFutureSessions: {
		title: 'Sessions Remaining',
		type: 'custom',
		renderComponent: BookingSessionsRemainingComponent,
		width: '200px'
	},
	ownerLastName: {
		title: 'Owner',
		type: 'custom',
		renderComponent: BookingOwnerComponent
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
