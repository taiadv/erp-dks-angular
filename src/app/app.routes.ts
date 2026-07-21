import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Layout } from './core/layout/layout';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'dashboard',
    component: Layout,
    children: [
      {
        path: '',
        component: Dashboard
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];