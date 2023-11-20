import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { NgxMaskModule } from 'ngx-mask';

const modules = [
  CommonModule,
  DocsComponentsModule,
  CardModule,
  FormModule,
  GridModule,
  ButtonModule,
  FormsModule,
  ReactiveFormsModule,
  FormModule,
  ButtonModule,
  ButtonGroupModule,
  DropdownModule,
  SharedModule,
  ListGroupModule,
]

@NgModule({
  imports: [...modules,     NgxMaskModule.forRoot(),
],
  exports: modules
})
export class CoreUIFormsModule {
}
