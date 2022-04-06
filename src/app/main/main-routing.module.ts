import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {AdminGuard} from './admin.guard';
import {UserGuard} from '../account/create-user/user.guard';
import {getStartPage} from "@helpers/get-start-page";

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
                path: 'billing',
                loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule)
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
