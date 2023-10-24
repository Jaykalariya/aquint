import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbDatepicker, NgbModule, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PrintErrorComponent } from './components/print-error/print-error.component';


@NgModule({
  declarations: [
    PrintErrorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    NgbModule,
    NgbDatepicker,
    NgbTimepicker,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgScrollbarModule,
    NgbTimepicker
  ]
})
export class SharedModule { }
