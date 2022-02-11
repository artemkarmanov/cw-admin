import {Injectable} from '@angular/core';
import {SocketMessagesService} from '../../core/socket-messages.service';
import {EMPTY, Observable, pluck} from 'rxjs';
import {IBooking, IBookingModificationResponse, INewBooking} from '../../core/types';
import {catchError, map} from 'rxjs/operators';
import {ErrorHandlerService} from '../../core/error-handler.service';

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

    constructor(
        private socketMessagesService: SocketMessagesService,
        private errorHandler: ErrorHandlerService
    ) {
    }

    public getBookings$(count?: number, start?: number, bookingToken?: string, includePast?: boolean): Observable<IBooking[]> {
        return this.socketMessagesService.request$<{ bookings?: IBooking[] }>('getBookingSummary', {}).pipe(
            pluck('bookings'),
            map(_ => _ as IBooking[])
        );
    }

    public getBooking$(bookingToken: string): Observable<IBooking | undefined> {
        return this.socketMessagesService.request$<{ bookings?: IBooking[] }>('getBookings', {bookingToken}).pipe(
            pluck('bookings'),
            map(_ => {
                if (_ && Array.isArray(_)) {
                    return _.shift();
                }
                return;
            })
        );
    }

    public createBooking$(data: INewBooking): Observable<IBookingModificationResponse> {
        return this.socketMessagesService.request$<IBookingModificationResponse>('createBooking', data).pipe(
            catchError((err) => {
                this.errorHandler.handle(err);
                return EMPTY;
            })
        );
    }
}
