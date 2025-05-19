import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'login', loadComponent: () => import('./components/auth/login/login.component').then(c => c.LoginComponent)},
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
