import {DateTime} from "luxon";
import {ISession} from "@interfaces/session.interfaces";
import {IBooking} from "@interfaces/booking.interfaces";

export function getFutureSessions(booking: IBooking): ISession[] | undefined {
	const now = DateTime.now();
	const sessions = Array.from(booking.sessions);

	return sessions.filter(session => {
		return DateTime.fromMillis(session.startEpoch) > now;
	});
}
