import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IBooking} from '../../../core/types';
import {BookingService} from '../booking.service';

@Injectable()
export class ViewService {

    constructor(private bookingService: BookingService) {
    }

    public getBooking(token: string): Observable<IBooking | undefined> {
        return this.bookingService.getBooking$(token);

    }
}
