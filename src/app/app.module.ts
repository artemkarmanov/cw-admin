import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WS_CONFIG_TOKEN} from './core/di';
import {environment} from '../environments/environment';
import {CoreModule} from './core/core.module';

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
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
