import {NgModule} from '@angular/core';
import {CreateRoutingModule} from './create-routing.module';
import {CreatePageComponent} from './create-page.component';
import {CreateServiceProviderModule} from './create-service-provider.module';
import {GeneralBookingInformationComponent} from './general-booking-information/general-booking-information.component';
import {InOutBookingInformationComponent} from './in-out-booking-information/in-out-booking-information.component';
import {BookingDetailsComponent} from './booking-details/booking-details.component';
import {StepTitleComponent} from './step-title/step-title.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {ViewersListComponent} from "./booking-details/viewers-list/viewers-list.component";


@NgModule({
    declarations: [
        CreatePageComponent,
        GeneralBookingInformationComponent,
        InOutBookingInformationComponent,
        BookingDetailsComponent,
        StepTitleComponent,
        ViewersListComponent
    ],
    imports: [
        SharedModule,
        CreateRoutingModule,
        CreateServiceProviderModule,
        FormsModule,
        NgbModule
    ]
})
export class CreateModule {
}
