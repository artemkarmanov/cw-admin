import {Pipe, PipeTransform} from '@angular/core';
import {IBooking} from '../../core/types';
import {findNextSession} from '../../core/utils';

@Pipe({
    name: 'sessionDuration'
})
export class SessionDurationPipe implements PipeTransform {

    transform(booking: IBooking): string {
        const s = findNextSession(booking);
        return (s) ? (s.sessionDurationMins + ' mins') : '';
    }

}
