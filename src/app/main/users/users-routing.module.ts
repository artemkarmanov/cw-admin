import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersPageComponent} from './users-page.component';
import {NewUserPageComponent} from './new-user-page/new-user-page.component';
import {EditUserPageComponent} from './edit-user-page/edit-user-page.component';

const routes: Routes = [
    {path: 'create', component: NewUserPageComponent},
    {path: ':id', component: EditUserPageComponent},
    {path: '', component: UsersPageComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
