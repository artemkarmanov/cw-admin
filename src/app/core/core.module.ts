import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from './auth.service';
import {SocketMessagesService} from './socket-messages.service';
import {ApplicationErrorHandler} from './application-error-handler';
import {ErrorHandlerService} from './error-handler.service';
import {ModalService} from './modal.service';
import {BreadCrumbsService} from './bread-crumbs.service';
import {TimezoneService} from './timezone.service';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        AuthService,
        SocketMessagesService,
        ApplicationErrorHandler,
        ErrorHandlerService,
        ModalService,
        BreadCrumbsService,
        TimezoneService
    ]
})
export class CoreModule {
}
