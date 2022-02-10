import {NgModule} from '@angular/core';

import {UpdateRoutingModule} from './update-routing.module';
import {UpdateComponent} from './update.component';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
    declarations: [
        UpdateComponent
    ],
    imports: [
        SharedModule,
        UpdateRoutingModule
    ]
})
export class UpdateModule {
}
