import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    // canActivate: [AuthGuard, RoleGuard],
    data: { 
      topNavigation: true, sideNavigation: true, selectedModule: 'dashboard', title: 'Dashboard',
      // role: [Roles.Admin, Roles.Coach, Roles.Parent, Roles.Volunteer]
    }
  },
  {
    path: 'configurations',
    loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule),
    // canActivate: [AuthGuard],
    data: { 
      topNavigation: true, sideNavigation: true, selectedModule: 'configurations', title: 'Configurations'
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
