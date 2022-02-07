import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ViewRoutingModule} from './view-routing.module';
import {ViewBookingPageComponent} from './view-booking-page.component';
import {BookingComponent} from './booking/booking.component';
import {SessionsComponent} from './sessions/sessions.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {AddSessionButtonComponent} from './add-session-button/add-session-button.component';
import {NewSessionDialogComponent} from './new-session-dialog/new-session-dialog.component';


@NgModule({
    declarations: [
        ViewBookingPageComponent,
        BookingComponent,
        SessionsComponent,
        AddSessionButtonComponent,
        NewSessionDialogComponent,

    ],
    imports: [
        CommonModule,
        ViewRoutingModule,
        NgbModalModule
    ]
})
export class ViewModule {
}
