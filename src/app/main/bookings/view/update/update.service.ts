import {Injectable} from '@angular/core';
import {SocketMessagesService} from '@services/socket-messages.service';
import {EMPTY, Observable} from 'rxjs';
import {ErrorHandlerService} from '@services/error-handler.service';
import {catchError} from 'rxjs/operators';
import {IBookingModificationResponse, IUpdateBooking} from "@interfaces/booking.interfaces";

@Injectable()
export class UpdateService {

    constructor(
        private messages: SocketMessagesService,
        private error: ErrorHandlerService
    ) {
    }

    public updateBooking$(bookingToken: string, userData: IUpdateBooking): Observable<IBookingModificationResponse> {
        const data = Object.assign({}, userData, {bookingToken});
        return this.messages.request$<IBookingModificationResponse>('updateBooking', data).pipe(
            catchError(e => {
                this.error.handle(e);
                return EMPTY;
            })
        )
    }
}
