import {IBooking, ISession} from './types';
import {DateTime} from 'luxon';

export function getFutureSessions(booking: IBooking): ISession[] | undefined {
    const now = DateTime.now();
    const sessions = Array.from(booking.sessions);

    const result = sessions.filter(session => {
        return DateTime.fromMillis(session.startEpoch) > now;
    });
    return result;
}

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
