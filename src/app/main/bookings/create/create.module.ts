import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CreateRoutingModule} from './create-routing.module';
import {CreateComponent} from './create.component';
import {CreateServiceProviderModule} from './create-service-provider.module';
import {GeneralBookingInformationComponent} from './general-booking-information/general-booking-information.component';
import {InOutBookingInformationComponent} from './in-out-booking-information/in-out-booking-information.component';
import {BookingDetailsComponent} from './booking-details/booking-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StepTitleComponent} from './step-title/step-title.component';


@NgModule({
    declarations: [
        CreateComponent,
        GeneralBookingInformationComponent,
        InOutBookingInformationComponent,
        BookingDetailsComponent,
        StepTitleComponent
    ],
    imports: [
        CommonModule,
        CreateRoutingModule,
        CreateServiceProviderModule,
        ReactiveFormsModule
    ]
})
export class CreateModule {
}
