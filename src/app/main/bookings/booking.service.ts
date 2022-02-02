import {Injectable} from '@angular/core';
import {SocketMessagesService} from '../../core/socket-messages.service';
import {Observable} from 'rxjs';
import {IBooking, INewBooking} from '../../core/types';
import {map} from 'rxjs/operators';

interface IGetBookingRequest {
    bookingToken?: string;
    includePast?: 0 | 1;
    start?: number;
    count?: number;

}

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    constructor(private socketMessagesService: SocketMessagesService) {
    }

    public getBookings$(count?: number, start?: number, bookingToken?: string, includePast?: boolean): Observable<IBooking[]> {
        return this.socketMessagesService.request$<{ bookings?: IBooking[] }>('getBookings').pipe(
            //pluck('bookings'),
            map(response => {
                return !response ? [] : (!response.bookings) ? [] : response.bookings;
            })
        );
    }

    public createBooking$(data: INewBooking) {
        return this.socketMessagesService.request$('createBooking', data);
    }
}
