import {NgModule} from '@angular/core';
import {CreateRoutingModule} from './create-routing.module';
import {CreatePageComponent} from './create-page.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    declarations: [
        CreatePageComponent
    ],
    imports: [
        SharedModule,
        CreateRoutingModule
    ]
})
export class CreateModule {
}
