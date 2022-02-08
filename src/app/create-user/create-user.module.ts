import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CreateUserRoutingModule} from './create-user-routing.module';
import {CreateUserPageComponent} from './create-user-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [
        CreateUserPageComponent
    ],
    imports: [
        CommonModule,
        CreateUserRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class CreateUserModule {
}
