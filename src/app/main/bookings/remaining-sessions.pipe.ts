import {Pipe, PipeTransform} from '@angular/core';
import {IBooking} from '../../core/types';
import {getFutureSessions} from '../../core/utils';

@Pipe({
    name: 'remainingSessions'
})
export class RemainingSessionsPipe implements PipeTransform {

    transform(booking: IBooking): string {
        const {sessions: sessions} = booking;
        const futureSessions = getFutureSessions(booking);
        const futureSessionCount = (futureSessions) ? futureSessions.length : 0;

        return [futureSessionCount, sessions.length].join(' of ');
    }

}
