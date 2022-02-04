import {Pipe, PipeTransform} from '@angular/core';
import {IBooking} from '../../core/types';
import {findNextSession} from '../../core/utils';

@Pipe({
    name: 'nextSession'
})
export class NextSessionPipe implements PipeTransform {

    transform(booking: IBooking): number | undefined {
        const s = findNextSession(booking);
        return (s !== undefined) ? s.startEpoch : undefined;
    }

}
