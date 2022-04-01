import {Pipe, PipeTransform} from '@angular/core';
import {findNextSession} from "@helpers/find-next-session";
import {IBooking} from "@interfaces/booking.interfaces";

@Pipe({name: 'sessionDuration'})
export class SessionDurationPipe implements PipeTransform {
    transform(booking: IBooking): string {
        const s = findNextSession(booking);
        return (s) ? (s.sessionDurationMins + ' mins') : '';
    }
}
