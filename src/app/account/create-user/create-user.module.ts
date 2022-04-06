import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateUserRoutingModule} from './create-user-routing.module';
import {CreateUserPageComponent} from './create-user-page.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        CreateUserPageComponent
    ],
    imports: [
        CommonModule,
        CreateUserRoutingModule,
        ReactiveFormsModule
    ]
})
export class CreateUserModule {
}
