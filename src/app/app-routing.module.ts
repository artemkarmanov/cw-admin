import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
    },
    {
        path: 'reset-password',
        loadChildren: () => import('./password-reset/password-reset.module').then(m => m.PasswordResetModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
