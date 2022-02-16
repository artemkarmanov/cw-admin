import {NgModule} from '@angular/core';

import {UsersRoutingModule} from './users-routing.module';
import {UsersPageComponent} from './users-page.component';
import {UserListComponent} from './user-list/user-list.component';
import {FilterComponent} from './filter/filter.component';
import {SharedModule} from '../../shared/shared.module';
import {RolePipe} from './role.pipe';
import {NewUserPageComponent} from './new-user-page/new-user-page.component';
import {EditUserPageComponent} from './edit-user-page/edit-user-page.component';
import {AddUserButtonComponent} from './add-user-button/add-user-button.component';
import {UserFormComponent} from './user-form/user-form.component';


@NgModule({
  declarations: [
    UsersPageComponent,
    UserListComponent,
    FilterComponent,
    RolePipe,
    NewUserPageComponent,
    EditUserPageComponent,
    AddUserButtonComponent,
    UserFormComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule {
}
