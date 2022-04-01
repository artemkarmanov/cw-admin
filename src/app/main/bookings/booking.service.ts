import {Injectable} from '@angular/core';
import {SocketMessagesService} from '../../core/socket-messages.service';
import {EMPTY, Observable, pluck} from 'rxjs';
import {IBooking, IBookingModificationResponse, IBookingSummary, INewBooking} from '../../core/types';
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

    public getBookings$(count?: number, start?: number, bookingToken?: string, includePast?: boolean): Observable<IBookingSummary[]> {
        return this.socketMessagesService.request$<{ bookings?: IBookingSummary[] }>('getBookingSummary').pipe(
            pluck('bookings'),
            map(_ => _ as IBookingSummary[])
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
        console.log(data)
        // We've adjusted the code so that this "Audio Details" info
        // is not necessary to fill in before continuing with the
        // process.  However, a blank value throws an error  on the
        // backend, so if it's blank, we should add a space, just
        // so no error is thrown
        if (data.audioDetails.length === 0) {
            data.audioDetails = " - "
        }
        return this.socketMessagesService.request$<IBookingModificationResponse>('createBooking', data).pipe(
            catchError((err) => {
                this.errorHandler.handle(err);
                return EMPTY;
            })
        );
    }
}
