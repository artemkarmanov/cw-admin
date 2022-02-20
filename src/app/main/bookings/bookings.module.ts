import {NgModule} from '@angular/core';

import {BookingsRoutingModule} from './bookings-routing.module';
import {BookingsPageComponent} from './bookings-page.component';
import {CreateButtonComponent} from './create-button/create-button.component';
import {NextSessionPipe} from './next-session.pipe';
import {SessionDurationPipe} from './session-duration.pipe';
import {SessionCounterPipe} from './remaining-sessions.pipe';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    declarations: [
        BookingsPageComponent,
        CreateButtonComponent,
        NextSessionPipe,
        SessionDurationPipe,
        SessionCounterPipe
    ],
    imports: [
        BookingsRoutingModule,
        SharedModule
    ]
})
export class BookingsModule {
}
