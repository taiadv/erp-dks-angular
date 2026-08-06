import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Layout } from './core/layout/layout';
import { Dashboard } from './features/dashboard/dashboard';
import { Categorias } from './features/categorias/categorias/categorias';
import { Produtos } from './features/produtos/produtos/produtos';

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
      },

      {
        path: 'categorias',
        component: Categorias
      },

      {
        path: 'produtos',
        component: Produtos
      }

    ]
  },

  {
    path: '**',
    redirectTo: ''
  }

];