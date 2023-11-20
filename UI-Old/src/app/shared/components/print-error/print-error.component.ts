import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-print-error',
  templateUrl: './print-error.component.html',
  styleUrls: ['./print-error.component.scss']
})
export class PrintErrorComponent {
  errorMsgList: any[] = [];

  @Input() 
  controlName?: AbstractControl | AbstractControlDirective | null

  errorMessage: any = {
      'required'  : (params: any)  => `This field is required`,
      'maxlength' : (params: any)  => `Maximum ${params.requiredLength} characters are allowed`,
      'minlength' : (params: any)  => `Minimum ${params.requiredLength} characters are required`,
      'pattern'   : (params: any)  => `Invalid format`,
      'min'       : (params: any)  => `Minimum amount should be ₹ ${params.min}`,
      'whitespace': (params: any)  => `White spaces are not allowed`,
      'email'     : (params: any)  => `Invalid email`,
      'ngbDate'   : (params: any)  => `Invalid date format`,
      'mask'      : (params: any)  => `Invalid value`,
      'misMatch'  : (params: any)  => `${params.matchingControl} must be same as ${params.control}.`
  };


  listErrors() {
      if (!this.controlName) return [];
      if (this.controlName.errors) {
          this.errorMsgList = [];
          Object.keys(this.controlName.errors).map( error => {
            if (this.controlName?.errors){
              (this.controlName.touched || this.controlName.dirty) && (error != 'ngbDate' || !("required" in this.controlName.errors)) ?
              this.errorMsgList.push(this.errorMessage[error](this.controlName.errors[error])) : '';
            } 
          });
          return this.errorMsgList;
      }
      else {
          return [];
      }
  }
}
