import {NgModule} from '@angular/core';
import {CreateRoutingModule} from './create-routing.module';
import {CreatePageComponent} from './create-page.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";

@NgModule({
    declarations: [
        CreatePageComponent
    ],
    imports: [
        SharedModule,
        CreateRoutingModule,
        NgxDaterangepickerMd,
    ]
})
export class CreateModule {
}
