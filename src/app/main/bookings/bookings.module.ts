import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookingsRoutingModule} from './bookings-routing.module';
import {BookingsComponent} from './bookings.component';
import {CreateButtonComponent} from './create-button/create-button.component';


@NgModule({
  declarations: [
    BookingsComponent,
    CreateButtonComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule
  ]
})
export class BookingsModule {
}
