import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const authRoutes: Routes = [
    {
      path: '',
      loadComponent: () => import('../shared/content/content.component').then(c => c.ContentComponent), canActivate: [AuthGuard],
      children: [
            { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) }
        ]
    }
];

