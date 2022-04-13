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

export class Booking {

}
