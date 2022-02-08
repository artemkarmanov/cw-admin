import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PasswordResetRoutingModule} from './password-reset-routing.module';
import {PasswordResetPageComponent} from './password-reset-page.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    PasswordResetPageComponent
  ],
  imports: [
    CommonModule,
    PasswordResetRoutingModule,
    ReactiveFormsModule
  ]
})
export class PasswordResetModule {
}
