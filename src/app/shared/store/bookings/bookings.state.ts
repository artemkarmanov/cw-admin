import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {GetBookingsResponse, GetBookingSummaryResponse} from "./bookings.actions";
import {IBooking, IBookingSummary} from "@interfaces/booking.interfaces";

export interface BookingStateModel {
	bookings: IBookingSummary[]
	booking: IBooking
	draftBooking: IBooking
}

@Injectable()
@State<null>({name: 'bookings'})
export class BookingsState {
	@Selector()
	public static bookings(state: BookingStateModel) {
		return state.bookings
	}

	@Selector()
	public static booking(state: BookingStateModel) {
		return state.booking
	}

	@Action(GetBookingSummaryResponse)
	private getBookingSummaryResponse(
		{patchState}: StateContext<BookingStateModel>,
		{data}: GetBookingSummaryResponse
	) {
		return patchState({bookings: data.bookings.reverse()})
	}

	@Action(GetBookingsResponse)
	private getBookingsResponse(
		{patchState}: StateContext<BookingStateModel>,
		{data}: GetBookingsResponse
	) {
		return patchState({booking: data.bookings.shift()})
	}
}
