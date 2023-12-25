import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientManagementRoutingModule } from './client-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListDivisionsComponent } from './Divisions/list-divisions/list-divisions.component';
import { ListDepartmentsComponent } from './Departments/list-departments/list-departments.component';
import { ListProductsComponent } from './Products/list-products/list-products.component';
import { ListPlaceOfSuppliesComponent } from './PlaceOfSupplies/list-place-of-supplies/list-place-of-supplies.component';
import { AddEditPlaceOfSupplyModalComponent } from './PlaceOfSupplies/add-edit-place-of-supply-modal/add-edit-place-of-supply-modal.component';



@NgModule({
  declarations: [
    ListDivisionsComponent,
    ListDepartmentsComponent,
    ListProductsComponent,
    ListPlaceOfSuppliesComponent,
    AddEditPlaceOfSupplyModalComponent
  ],
  imports: [
    CommonModule,
    ClientManagementRoutingModule,
    SharedModule
  ]
})
export class ClientManagementModule { }
