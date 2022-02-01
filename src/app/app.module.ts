import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {CoreModule} from './core/core.module';
import {ApplicationErrorHandler} from './core/application-error-handler';
import {WS_CONFIG_TOKEN} from './core/types';

@NgModule({
    declarations: [
        AppComponent
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
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
