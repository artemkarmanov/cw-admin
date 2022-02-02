import {Injectable} from '@angular/core';
import {CreateServiceProviderModule} from './create-service-provider.module';
import {BookingService} from '../booking.service';
import {INewBooking} from '../../../core/types';

@Injectable({
    providedIn: CreateServiceProviderModule
})
export class CreateService {
    private step: number = 1;

    constructor(private bookingService: BookingService) {
    }

    public getStep(): number {
        return this.step;

    }

    public nextStep() {
        this.step++;
    }

    public previousStep() {
        this.step--;
    }

    public create$() {
        const data: INewBooking = {};
        return this.bookingService.createBooking$(data);
    }
}
