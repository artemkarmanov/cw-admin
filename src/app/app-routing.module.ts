import {NgModule} from '@angular/core';
import {RouterModule, Routes, UrlSegment} from '@angular/router';
import {ChangePasswordGuard} from './account/change-password/change-password.guard';
import {UserGuard} from './account/create-user/user.guard';
import {SimpleLayoutComponent} from "./account/simple-layout/simple-layout.component";

const routes: Routes = [
    {
        matcher: function (segments: UrlSegment[]) {
            if (segments.length && ['checkResetPassword', 'sign-up', 'passwordreset', 'reset-password'].includes(segments[0].path)) {
                return {
                    consumed: [],
                };
            }
            return null;
        },
        component: SimpleLayoutComponent,
        children: [
            {
                path: 'passwordreset',
                canActivate: [ChangePasswordGuard],
                loadChildren: () => import('./account/change-password/change-password.module').then(m => m.ChangePasswordModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('./account/create-user/create-user.module').then(m => m.CreateUserModule)
            },
            {
                path: 'reset-password',
                loadChildren: () => import('./account/password-reset/password-reset.module').then(m => m.PasswordResetModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('./account/create-user/create-user.module').then(m => m.CreateUserModule),
                canLoad: [UserGuard]
            },
        ]
    },
    {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [ChangePasswordGuard]
})
export class AppRoutingModule {
}
