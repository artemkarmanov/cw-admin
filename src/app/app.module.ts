import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '@env';
import {ApplicationErrorHandler} from '@services/application-error-handler';
import {LOCAL_STORAGE, SESSION_STORAGE} from 'ngx-webstorage-service';
import {TOKEN_SERVICE, USER_INFO} from '@constants/const';
import {SimpleLayoutComponent} from './account/simple-layout/simple-layout.component';
import {WS_CONFIG_TOKEN} from "@interfaces/websocket.interfaces";
import {SocketMessagesService} from "@services/socket-messages.service";
import {AuthService} from "@services/auth.service";
import {ErrorHandlerService} from "@services/error-handler.service";
import {BreadCrumbsService} from "@services/bread-crumbs.service";
import {TimezoneService} from "@services/timezone.service";
import {UsersService} from "@services/users.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogService} from "@services/dialog.service";
import {OverlayModule} from "@angular/cdk/overlay";

@NgModule({
	declarations: [
		AppComponent,
		SimpleLayoutComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		OverlayModule
	],
	providers: [
		{
			provide: WS_CONFIG_TOKEN,
			useValue: {
				host: environment.backend
			}
		},
		{provide: ErrorHandler, useClass: ApplicationErrorHandler},
		{provide: TOKEN_SERVICE, useExisting: LOCAL_STORAGE},
		{provide: USER_INFO, useExisting: SESSION_STORAGE},
		SocketMessagesService,
		AuthService,
		ApplicationErrorHandler,
		DialogService,
		ErrorHandlerService,
		BreadCrumbsService,
		TimezoneService,
		UsersService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
