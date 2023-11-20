import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonHttpService } from 'src/app/shared/services/common-http/common-http.service';
import { CommunicationService } from 'src/app/shared/services/communication/communication.service';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss']
})
export class SampleFormComponent {

  sampleForm: FormGroup;

  constructor(private commonHttpService: CommonHttpService,
              private formBuilder: FormBuilder,
              private communicationService: CommunicationService){

  }

  ngOnInit(){
    this.createFormValidator();
  }

  createFormValidator(){
    this.sampleForm = this.formBuilder.group({
      firstName: ['', [Validators.minLength(3), Validators.maxLength(512), Validators.required]],
      lastName: ['', [Validators.minLength(3), Validators.maxLength(512), Validators.required]],
      middleName: ['',[Validators.minLength(3), Validators.maxLength(512), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required]],
      // dropdown: ['', [Validators.required]],
    });
  }

  get sampleFormControls() {
    return this.sampleForm.controls;
  }

  submitForm(){
    if(!this.sampleForm.invalid){
      console.log(this.sampleForm.value);
    }
    else{
      console.log("Validation error");
    }
  }
}
