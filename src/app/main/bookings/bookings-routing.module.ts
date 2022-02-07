import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingsPageComponent} from './bookings-page.component';

const routes: Routes = [
    {path: '', component: BookingsPageComponent},
    {path: 'create', loadChildren: () => import('./create/create.module').then(m => m.CreateModule)},
    {path: ':booking_id', loadChildren: () => import('./view/view.module').then(m => m.ViewModule)}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BookingsRoutingModule {
}
