// src/app/app.routes.ts
import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes=[
    {
        path: '', // base path for the auth module
        loadChildren: () =>
            import( './features/auth/auth.module' ).then( m => m.AuthModule )
    },
    {
        path: '',
        loadChildren: () => import( './features/dashboard/dashboard.module' ).then( m => m.DashboardModule ),
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
