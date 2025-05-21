import { Routes } from '@angular/router';
import { authRoutes } from './components/auth/auth.router';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./components/auth/login/login.component').then(c => c.LoginComponent)},
    ...authRoutes,
    { path: '**', redirectTo: '/login', pathMatch: 'prefix' }
];

