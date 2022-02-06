import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {CoreModule} from './core/core.module';
import {ApplicationErrorHandler} from './core/application-error-handler';
import {WS_CONFIG_TOKEN} from './core/types';
import {LOCAL_STORAGE, SESSION_STORAGE} from 'ngx-webstorage-service';
import {TOKEN_SERVICE, USER_INFO} from './core/const';
import {ErrorComponent} from './error/error.component';

@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule
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
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
