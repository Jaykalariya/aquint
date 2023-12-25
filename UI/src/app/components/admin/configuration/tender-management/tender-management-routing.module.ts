import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTenderStageComponent } from './TenderStage/list-tender-stage/list-tender-stage.component';
import { ListTenderTypeComponent } from './TenderType/list-tender-type/list-tender-type.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'stage',
    component: ListTenderStageComponent
  },
  {
    path: 'type',
    component: ListTenderTypeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderManagementRoutingModule { }
