import {Injectable} from '@angular/core';
import {INewBooking} from "@interfaces/booking.interfaces";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";

@Injectable({providedIn: 'root'})
export class BookingService {
    @Dispatch()
    public getBookings$() {
        return new Send({type: MessageType.GetBookingSummary})
    }

    @Dispatch()
    public getBooking$(bookingToken: string) {
        return new Send({
            type: MessageType.GetBookings,
            data: {bookingToken}
        })
    }

    @Dispatch()
    public createBooking$(data: INewBooking) {
        if (data.audioDetails.length === 0) {
            data.audioDetails = " - "
        }

        return new Send({type: MessageType.CreateBooking, data})
    }
}
