import {NgModule} from '@angular/core';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [
        MainComponent,
        LoginComponent,
    ],
    imports: [
        SharedModule,
        MainRoutingModule,
        ReactiveFormsModule
    ]
})
export class MainModule {
}
