import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleFormComponent } from './sample-form/sample-form.component';


const routes: Routes = [
  {
    path: 'sample-form',
    component: SampleFormComponent,
    data: {
      title: $localize`Sample Form`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule { }
