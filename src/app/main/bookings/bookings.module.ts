import {NgModule} from '@angular/core';
import {BookingsRoutingModule} from './bookings-routing.module';
import {BookingsPageComponent} from './bookings-page.component';
import {NextSessionPipe} from './next-session.pipe';
import {SessionDurationPipe} from './session-duration.pipe';
import {SessionCounterPipe} from './remaining-sessions.pipe';
import {SharedModule} from '../../shared/shared.module';
import {BookingLinkComponent} from './bookings-table/booking-link/booking-link.component';
import {
    BookingSessionsRemainingComponent
} from './bookings-table/booking-sessions-remaining/booking-sessions-remaining.component';
import {BookingOwnerComponent} from './bookings-table/booking-owner/booking-owner.component';

@NgModule({
    declarations: [
        BookingsPageComponent,
        NextSessionPipe,
        SessionDurationPipe,
        SessionCounterPipe,
        BookingLinkComponent,
        BookingSessionsRemainingComponent,
        BookingOwnerComponent,
    ],
    imports: [
        BookingsRoutingModule,
        SharedModule
    ]
})
export class BookingsModule {
}
