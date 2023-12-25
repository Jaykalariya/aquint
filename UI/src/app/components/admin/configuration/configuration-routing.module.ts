import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tenders',
    loadChildren: () => import('./tender-management/tender-management.module').then(m => m.TenderManagementModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
