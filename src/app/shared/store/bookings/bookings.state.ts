import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {
	CancelSessionResponse,
	GetBookingsResponse,
	GetBookingSummaryResponse
} from "./bookings.actions";
import {IBooking, IBookingSummary} from "@interfaces/booking.interfaces";
import {TSessionStatus} from "@interfaces/session.interfaces";

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

	@Selector()
	public static bookingSessions(state: BookingStateModel) {
		return state.booking.sessions
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

	@Action(CancelSessionResponse)
	private cancelSessionResponse(
		{patchState, getState}: StateContext<BookingStateModel>,
		{data}: CancelSessionResponse
	) {
		const sessions = getState().booking.sessions

		const updatedSessions = sessions.map(session => {
			if (session.sessionId === Number(data.sessionId)) {
				return {...session, status: TSessionStatus.Cancelled}
			}
			return session
		})

		return patchState({
			booking: {
				...getState().booking,
				sessions: updatedSessions
			}
		})
	}
}
