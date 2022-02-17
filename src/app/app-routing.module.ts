import {NgModule} from '@angular/core';
import {RouterModule, Routes, UrlSegment} from '@angular/router';
import {ChangePasswordGuard} from './core/change-password.guard';
import {SimpleLayoutComponent} from './simple-layout/simple-layout.component';
import {UserGuard} from './core/user.guard';

const routes: Routes = [
    {
        matcher: function (segments: UrlSegment[]) {
            if (segments.length && ['checkResetPassword', 'reset-password', 'sign-up'].includes(segments[0].path)) {
                return {
                    consumed: [],
                };
            }
            return null;
        },
        component: SimpleLayoutComponent,
        children: [
            {
                path: 'checkResetPassword',
                //canLoad:[ChangePasswordGuard],
                canActivate: [ChangePasswordGuard],
                loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule)
            },
            {
                path: 'reset-password',
                loadChildren: () => import('./password-reset/password-reset.module').then(m => m.PasswordResetModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('./create-user/create-user.module').then(m => m.CreateUserModule),
                canActivate: [UserGuard]
            },
        ]
    },
    {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
    },


];

@NgModule({
    imports: [RouterModule.forRoot(routes/*, {enableTracing: true}*/)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
