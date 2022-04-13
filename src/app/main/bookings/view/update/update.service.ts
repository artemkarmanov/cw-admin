import {Injectable} from '@angular/core';
import {IUpdateBooking} from "@interfaces/booking.interfaces";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";

@Injectable()
export class UpdateService {
    @Dispatch()
    public updateBooking$(bookingToken: string, userData: IUpdateBooking) {
        const data = Object.assign({}, userData, {bookingToken});

        return new Send({
            type: MessageType.UpdateBooking,
            data
        })
    }
}
