import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {AdminGuard} from '../core/admin.guard';
import {getStartPage} from '../core/utils';
import {UserGuard} from '../core/user.guard';

const routes: Routes = [
    {
        path: '', component: MainComponent,
        children: [
            {
                path: 'bookings',
                loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsModule)
            },
            {
                path: 'sessions',
                loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
                canLoad: [AdminGuard]
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
                canLoad: [AdminGuard]
            },
            {
                path: 'account-settings',
                loadChildren: () => import('./account-settings/account-settings.module').then(m => m.AccountSettingsModule),
                canLoad: [UserGuard]
            },
            {
                path: '',
                redirectTo: getStartPage()
            }

        ]
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
}
