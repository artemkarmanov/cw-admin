import {NgModule} from '@angular/core';
import {CreateUserRoutingModule} from './create-user-routing.module';
import {CreateUserPageComponent} from './create-user-page.component';
import {CoreModule} from "../../shared/core/core.module";

@NgModule({
    declarations: [
        CreateUserPageComponent
    ],
	imports: [
		CoreModule,
		CreateUserRoutingModule
	]
})
export class CreateUserModule {
}
