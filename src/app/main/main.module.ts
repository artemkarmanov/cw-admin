import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LogoutButtonComponent} from './logout-button/logout-button.component';


@NgModule({
    declarations: [
        MainComponent,
        LoginComponent,
        LogoutButtonComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        ReactiveFormsModule
    ]
})
export class MainModule {
}
