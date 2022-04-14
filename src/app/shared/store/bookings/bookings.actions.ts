import {IBooking, IBookingSummary} from "@interfaces/booking.interfaces";
import {HttpStatusCode} from "@angular/common/http";
import {ResponseType} from "@constants/response-type";

export class GetBookingSummaryResponse {
	static readonly type = ResponseType.GetBookingSummaryResponse

	constructor (
		public data: {bookings: IBookingSummary[]},
		public p: number,
		public error: string,
		public code: HttpStatusCode
	) {
	}
}

export class GetBookingsResponse {
	static readonly type = ResponseType.GetBookingsResponse

	constructor(
		public data: {bookings: IBooking[]},
		public p: number,
		public error: string,
		public code: HttpStatusCode
	) {
	}
}

export class CancelSessionResponse {
	static readonly type = ResponseType.CancelSessionResponse

	constructor(
		public data: {sessionId: number},
		public code: HttpStatusCode,
		public p: number,
		public error: string
	) {
	}
}

export class CreateBookingResponse {
	static readonly type = ResponseType.CreateBookingResponse

	constructor(
		public data: {
			bookingToken: number
			bookingPasscode: string
			bookingPasscodeHash: string
			bookingCaptionerPasscode: string
		},
		public code: HttpStatusCode,
		public p: number,
		public error: string
	) {
	}
}
