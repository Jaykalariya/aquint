import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTenderTypeComponent } from './TenderType/list-tender-type/list-tender-type.component';
import { ListTenderStageComponent } from './TenderStage/list-tender-stage/list-tender-stage.component';
import { AddTenderStageComponent } from './TenderStage/add-tender-stage/add-tender-stage.component';
import { TenderManagementRoutingModule } from './tender-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListTenderTypeComponent,
    ListTenderStageComponent,
    AddTenderStageComponent
  ],
  imports: [
    CommonModule,
    TenderManagementRoutingModule,
    SharedModule
  ]
})
export class TenderManagementModule { }
