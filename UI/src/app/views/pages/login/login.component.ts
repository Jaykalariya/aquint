import { Component } from '@angular/core';
import { CommonHttpService } from '../../../shared/services/common-http/common-http.service';
import { SessionStorageService } from '../../../shared/services/session-storage/session-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private commonHttpService: CommonHttpService,
              private sessionStorageService: SessionStorageService,
              private formBuilder: FormBuilder) 
  { 
    this.createFormValidator();
  }

  createFormValidator(){
    this.loginForm =this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  login(){
    if(this.loginForm.invalid) return;
    let loginFormValues = this.loginForm.value;
    this.commonHttpService.post({
      uri: '/auth/signin',
      object: {
        username: loginFormValues.username,
        password: loginFormValues.password
      }
    }).subscribe((response: any) => {
      this.sessionStorageService.setAccessToken(response);
    });
  }
}
