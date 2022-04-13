import {NgModule} from '@angular/core';
import {CreateRoutingModule} from './create-routing.module';
import {CreatePageComponent} from './create-page.component';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {ViewersListComponent} from "./viewers-list/viewers-list.component";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";

@NgModule({
    declarations: [
        CreatePageComponent,
        ViewersListComponent
    ],
    imports: [
        SharedModule,
        CreateRoutingModule,
        FormsModule,
        NgxDaterangepickerMd,
    ]
})
export class CreateModule {
}
