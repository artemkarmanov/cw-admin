import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PasswordResetRoutingModule} from './password-reset-routing.module';
import {PasswordResetPageComponent} from './password-reset-page.component';


@NgModule({
  declarations: [
    PasswordResetPageComponent
  ],
  imports: [
    CommonModule,
    PasswordResetRoutingModule
  ]
})
export class PasswordResetModule {
}
