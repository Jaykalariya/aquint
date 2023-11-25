import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditUsersComponent } from './add-edit-user/add-edit-users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';



@NgModule({
  declarations: [
    AddEditUsersComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
