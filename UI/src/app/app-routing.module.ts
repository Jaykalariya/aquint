import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './shared/layout-components/layout/content-layout/content-layout.component';
import { content } from './shared/routes/routes copy';


import { ErrorLayoutComponent } from './shared/layout-components/layout/error-layout/error-layout.component';
import { Content_Routes } from './shared/routes/error.routes';
import { SwitcherLayoutComponent } from './shared/layout-components/layout/switcher-layout/switcher-layout.component';
import { SwitcherOneRoute } from './shared/routes/switchers';



const routes: Routes = [

  { path: '', redirectTo:'auth/login', pathMatch: 'full'},
  {
    path: '',
    redirectTo: '/dashboard/sales',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content
  },
  {
    path: '',
    component: SwitcherLayoutComponent,
    children: SwitcherOneRoute
  },
  {
    path: '',
    component: ErrorLayoutComponent,
    children: Content_Routes
  },



  // {
  //   path: '**',
  //   redirectTo: 'custompages/error400',
  //   pathMatch: 'full'
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }
