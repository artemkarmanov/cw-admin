import {getFutureSessions} from "./get-future-sessions";
import {ISession} from "@interfaces/session.interfaces";
import {IBooking} from "@interfaces/booking.interfaces";

export function findNextSession(booking: IBooking): ISession | undefined {
	const sessions = getFutureSessions(booking);
	if (!sessions) {
		return undefined;
	} else {
		sessions.sort((a, b) => {
			return b.startEpoch - a.startEpoch;
		});
		return sessions.shift();
	}
}
