import {NgModule} from '@angular/core';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from './header/header.component';
import {LogoutButtonComponent} from './header/logout-button/logout-button.component';
import {UserInfoComponent} from './header/user-info/user-info.component';
import {LoginFormComponent} from './login/login-form/login-form.component';
import {BreadCrumbsComponent} from './header/bread-crumbs/bread-crumbs.component';


@NgModule({
    declarations: [
        MainComponent,
        LoginComponent,
        HeaderComponent,
        LogoutButtonComponent,
        UserInfoComponent,
        LoginFormComponent,
        BreadCrumbsComponent
    ],
    imports: [
        SharedModule,
        MainRoutingModule,
        ReactiveFormsModule
    ]
})
export class MainModule {
}
