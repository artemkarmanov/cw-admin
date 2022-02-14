import {NgModule} from '@angular/core';

import {ViewRoutingModule} from './view-routing.module';
import {ViewBookingPageComponent} from './view-booking-page.component';
import {BookingComponent} from './booking/booking.component';
import {SessionsComponent} from './sessions/sessions.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {AddSessionButtonComponent} from './add-session-button/add-session-button.component';
import {SessionDialogComponent} from './session-dialog/session-dialog.component';
import {ShareBookingLinkComponent} from './share-booking-link/share-booking-link.component';
import {SharedModule} from '../../../shared/shared.module';
import {StatusDirective} from './sessions/status.directive';


@NgModule({
    declarations: [
        ViewBookingPageComponent,
        BookingComponent,
        SessionsComponent,
        AddSessionButtonComponent,
        SessionDialogComponent,
        ShareBookingLinkComponent,
        StatusDirective,

    ],
    imports: [
        SharedModule,
        ViewRoutingModule,
        NgbModalModule
    ]
})
export class ViewModule {
}
