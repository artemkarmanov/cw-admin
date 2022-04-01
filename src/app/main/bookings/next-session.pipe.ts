import {Pipe, PipeTransform} from '@angular/core';
import {findNextSession} from "@helpers/find-next-session";
import {IBooking} from "@interfaces/booking.interfaces";

@Pipe({name: 'nextSession'})
export class NextSessionPipe implements PipeTransform {
    transform(booking: IBooking): number | undefined {
        const s = findNextSession(booking);
        return (s !== undefined) ? s.startEpoch : undefined;
    }
}
