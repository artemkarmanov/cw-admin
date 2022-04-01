import {NgModule} from '@angular/core';

import {UpdateRoutingModule} from './update-routing.module';
import {UpdateComponent} from './update.component';
import {SharedModule} from '../../../../shared/shared.module';
import {ClipboardModule} from 'ngx-clipboard';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        UpdateComponent
    ],
    imports: [
        SharedModule,
        UpdateRoutingModule,
        ClipboardModule,
        NgbTooltipModule
    ]
})
export class UpdateModule {
}
