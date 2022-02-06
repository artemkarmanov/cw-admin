import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoutButtonComponent} from './logout-button/logout-button.component';
import {ButtonModule} from 'primeng/button';


@NgModule({
    declarations: [
        LogoutButtonComponent
    ],
    exports: [
        LogoutButtonComponent,
        CommonModule
    ],
    imports: [
        CommonModule,
        ButtonModule
    ]
})
export class SharedModule {
}
