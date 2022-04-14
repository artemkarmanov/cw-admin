import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '@env';
import {ApplicationErrorHandler} from '@services/application-error-handler';
import {SimpleLayoutComponent} from './account/simple-layout/simple-layout.component';
import {ErrorHandlerService} from "@services/error-handler.service";
import {BreadCrumbsService} from "@services/bread-crumbs.service";
import {TimezoneService} from "@services/timezone.service";
import {UsersService} from "@services/users.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogService} from "@services/dialog.service";
import {OverlayModule} from "@angular/cdk/overlay";
import {NgxsModule, Store} from "@ngxs/store";
import {ConnectWebSocket, NgxsWebsocketPluginModule} from "@ngxs/websocket-plugin";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {NgxsDispatchPluginModule} from "@ngxs-labs/dispatch-decorator";
import {UserState} from "@store/user.state";
import {WebsocketState} from "@store/websocket.state";
import {BookingsState} from "@store/bookings.state";
import {NgxsSelectSnapshotModule} from "@ngxs-labs/select-snapshot";
import {SessionsState} from "@store/sessions.state";
import {UsersState} from "@store/users.state";
import {BillingsState} from "@store/billings.state";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
import {MatSnackBarModule} from "@angular/material/snack-bar";

function initialize(store: Store) {
	return () => store.dispatch(new ConnectWebSocket())
}

@NgModule({
	declarations: [
		AppComponent,
		SimpleLayoutComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatSnackBarModule,
		BrowserAnimationsModule,
		OverlayModule,
		NgxsModule.forRoot([
				BookingsState,
				WebsocketState,
				UserState,
				SessionsState,
				UsersState,
				BillingsState
			],
			{
				developmentMode: !environment.production
			}
		),
		NgxsReduxDevtoolsPluginModule.forRoot({
			disabled: environment.production
		}),
		NgxsStoragePluginModule.forRoot({
			key: [
				BookingsState,
				UserState,
				WebsocketState,
				UsersState,
				BillingsState
			],
		}),
		NgxsWebsocketPluginModule.forRoot({url: environment.backend}),
		NgxsDispatchPluginModule.forRoot(),
		NgxsSelectSnapshotModule.forRoot(),
		NgxsRouterPluginModule.forRoot()
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initialize,
			deps: [Store],
			multi: true
		},
		{
			provide: ErrorHandler,
			useClass: ApplicationErrorHandler
		},
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
