import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitcherComponent } from './switcher/switcher.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SwitcherComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class PagesModule { }
