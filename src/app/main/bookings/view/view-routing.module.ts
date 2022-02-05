import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewComponent} from './view.component';
import {BookingComponent} from './booking/booking.component';

const routes: Routes = [
    {
        path: '',
        component: ViewComponent,
        children: [
            {
                path: 'edit', loadChildren: () => import('./update/update.module').then(m => m.UpdateModule)
            },
            {
                path: '', component: BookingComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewRoutingModule {
}
