import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderItem } from 'src/app/shared/models/common.model';
import { CommonHttpService } from 'src/app/shared/services/common-http/common-http.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})
export class AddEditUsersComponent implements OnInit {

  userForm: FormGroup;
  items: PageHeaderItem[] = [];

  constructor(private commonHttpService: CommonHttpService,
              private router: Router,
              private formBuilder: FormBuilder) 
  { 
    this.createFormValidator();
    this.items = [
      {title: 'Users', url: '/configurations/users', active: false},
      {title: 'Create User', active: true}
    ]
  }

  ngOnInit(): void {
    
  }

  createFormValidator(){
    this.userForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required]],
      birthDate: [],
      gender: ['', Validators.required],
      bloodGroup: [''],
      maritalStatus: [],
      anniversaryDate: [''],
      nationality: [''],
      religion: [''],
      address: [''],
      imageUrl: ['']
    });
  }

  get userFormControls(){
    return this.userForm.controls;
  }

}
