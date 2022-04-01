import {NgModule} from '@angular/core';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared/shared.module';
import {LoginFormComponent} from './login/login-form/login-form.component';

@NgModule({
	declarations: [
		MainComponent,
		LoginComponent,
		LoginFormComponent
	],
	imports: [
		SharedModule,
		MainRoutingModule
	]
})
export class MainModule {
}
