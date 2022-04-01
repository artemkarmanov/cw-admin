import {Pipe, PipeTransform} from '@angular/core';
import {IBookingSummary} from "@interfaces/booking.interfaces";

@Pipe({name: 'sessionCounter'})
export class SessionCounterPipe implements PipeTransform {
    transform(booking: IBookingSummary): string {
        return [booking.countFutureSessions, booking.totalSessions].join(' of ');
    }
}
