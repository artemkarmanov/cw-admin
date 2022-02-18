import {NgModule} from '@angular/core';

import {SessionsRoutingModule} from './sessions-routing.module';
import {SessionsPageComponent} from './sessions-page.component';
import {FilterComponent} from './filter/filter.component';
import {SharedModule} from '../../shared/shared.module';
import {OwnerPipe} from './owner.pipe';


@NgModule({
    declarations: [
        SessionsPageComponent,
        FilterComponent,
        OwnerPipe
    ],
    imports: [
        SessionsRoutingModule,
        SharedModule
    ]
})
export class SessionsModule {
}
