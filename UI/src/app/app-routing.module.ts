import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/pages/error404/error404.component';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: '/dashboard',
      pathMatch: 'full'
  },
  // {
  //   path: '',
  //   component: ContentLayoutComponent,
  //   children: content
  // },
  // {
  //   path: '',
  //   component: SwitcherLayoutComponent,
  //   children: SwitcherOneRoute
  // },
  // {
  //   path: '',
  //   component: ErrorLayoutComponent,
  //   children: Content_Routes
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'error400',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: 'error400',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }
