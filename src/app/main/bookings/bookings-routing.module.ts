import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingsComponent} from './bookings.component';

const routes: Routes = [
    {path: '', component: BookingsComponent},
    {path: 'create', loadChildren: () => import('./create/create.module').then(m => m.CreateModule)},
    {path: ':booking_id', loadChildren: () => import('./view/view.module').then(m => m.ViewModule)}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BookingsRoutingModule {
}
