import {NgModule} from '@angular/core';

import {AccountSettingsRoutingModule} from './account-settings-routing.module';
import {AccountSettingsPageComponent} from './account-settings-page.component';
import {UserSettingsComponent} from './general-settings/user-settings.component';
import {PaymentComponent} from './payment/payment.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    declarations: [
        AccountSettingsPageComponent,
        UserSettingsComponent,
        PaymentComponent
    ],
    imports: [
        SharedModule,
        AccountSettingsRoutingModule
    ]
})
export class AccountSettingsModule {
}
