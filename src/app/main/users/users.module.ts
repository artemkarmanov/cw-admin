import {NgModule} from '@angular/core';
import {UsersRoutingModule} from './users-routing.module';
import {UsersPageComponent} from './users-page.component';
import {SharedModule} from '../../shared/shared.module';
import {RolePipe} from './role.pipe';
import {NewUserPageComponent} from './new-user-page/new-user-page.component';
import {EditUserPageComponent} from './edit-user-page/edit-user-page.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UsersEditButtonComponent} from './users-table/users-table-actions/users-edit-button/users-edit-button.component';
import {UsersTableActionsComponent} from './users-table/users-table-actions/users-table-actions.component';

@NgModule({
  declarations: [
    UsersPageComponent,
    RolePipe,
    NewUserPageComponent,
    EditUserPageComponent,
    UserFormComponent,
    UsersEditButtonComponent,
    UsersTableActionsComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule {
}
