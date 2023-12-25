import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditUsersComponent } from './users/add-edit-user/add-edit-users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AddRoleModalComponent } from './roles/add-role-modal/add-role-modal.component';
import { RolesComponent } from './roles/roles/roles.component';

@NgModule({
  declarations: [
    AddEditUsersComponent,
    UserListComponent,
    RolesComponent,
    AddRoleModalComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule
  ]
})
export class UserManagementModule { }
