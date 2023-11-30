import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderItem } from 'src/app/shared/models/common.model';
import { CommonHttpService } from 'src/app/shared/services/common-http/common-http.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {

  ngbModalRef: NgbModalRef;
  userForm: FormGroup;
  items: PageHeaderItem[] = [];

  constructor(private commonHttpService: CommonHttpService,
              private router: Router,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) 
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

  }
}
