import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// custom modules
import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { CoreUIFormsModule } from '../../shared/modules/forms/forms.module';

// components
import { SampleFormComponent } from './sample-form/sample-form.component';



@NgModule({
  declarations: [
    SampleFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    CoreUIFormsModule
  ],
})
export class UsersModule { }
