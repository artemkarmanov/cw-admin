import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'reset-password',
        loadChildren: () => import('./password-reset/password-reset.module').then(m => m.PasswordResetModule)
    },
    {
        path: 'sign-up',
        loadChildren: () => import('./create-user/create-user.module').then(m => m.CreateUserModule)
    },
    {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
    },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
