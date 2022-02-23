import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountSettingsPageComponent} from './account-settings-page.component';

const routes: Routes = [{path: '', component: AccountSettingsPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule {
}
