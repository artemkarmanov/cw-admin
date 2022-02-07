import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewBookingPageComponent} from './view-booking-page.component';
import {BookingComponent} from './booking/booking.component';

const routes: Routes = [
    {
        path: '',
        component: ViewBookingPageComponent,
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
