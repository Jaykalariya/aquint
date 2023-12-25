import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { AddEditUsersComponent } from './users/add-edit-user/add-edit-users.component';
import { RolesComponent } from './roles/roles/roles.component';
import { AddRoleModalComponent } from './roles/add-role-modal/add-role-modal.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/create',
    component: AddEditUsersComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'roles/create',
    component: AddRoleModalComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
