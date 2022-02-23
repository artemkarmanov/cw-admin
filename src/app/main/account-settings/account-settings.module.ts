import {NgModule} from '@angular/core';

import {AccountSettingsRoutingModule} from './account-settings-routing.module';
import {AccountSettingsPageComponent} from './account-settings-page.component';
import {GeneralSettingsComponent} from './general-settings/general-settings.component';
import {PaymentComponent} from './payment/payment.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    declarations: [
        AccountSettingsPageComponent,
        GeneralSettingsComponent,
        PaymentComponent
    ],
    imports: [
        SharedModule,
        AccountSettingsRoutingModule
    ]
})
export class AccountSettingsModule {
}
