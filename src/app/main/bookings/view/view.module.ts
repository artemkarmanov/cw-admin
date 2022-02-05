import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ViewRoutingModule} from './view-routing.module';
import {ViewComponent} from './view.component';
import {BookingComponent} from './booking/booking.component';


@NgModule({
  declarations: [
    ViewComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule
  ]
})
export class ViewModule {
}
