import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SessionsRoutingModule} from './sessions-routing.module';
import {SessionsComponent} from './sessions.component';
import {FilterComponent} from './filter/filter.component';


@NgModule({
  declarations: [
    SessionsComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    SessionsRoutingModule
  ]
})
export class SessionsModule {
}
