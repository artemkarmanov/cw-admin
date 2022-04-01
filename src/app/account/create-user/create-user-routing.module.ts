import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateUserPageComponent} from './create-user-page.component';

const routes: Routes = [{path: '', component: CreateUserPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUserRoutingModule {
}
