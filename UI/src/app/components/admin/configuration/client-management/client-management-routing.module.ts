import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListDivisionsComponent } from './Divisions/list-divisions/list-divisions.component';
import { ListDepartmentsComponent } from './Departments/list-departments/list-departments.component';
import { ListProductsComponent } from './Products/list-products/list-products.component';
import { ListPlaceOfSuppliesComponent } from './PlaceOfSupplies/list-place-of-supplies/list-place-of-supplies.component';

const routes: Routes = [
  {
    path: 'divisions',
    component: ListDivisionsComponent
  },
  {
    path: 'departments',
    component: ListDepartmentsComponent
  },
  {
    path: 'products',
    component: ListProductsComponent
  },
  {
    path: 'place-of-supply',
    component: ListPlaceOfSuppliesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientManagementRoutingModule { }
