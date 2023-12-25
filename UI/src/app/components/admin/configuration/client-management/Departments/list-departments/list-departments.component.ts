import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddCommonModalComponent } from 'src/app/shared/components/add-common-modal/add-common-modal.component';
import { User } from 'src/app/shared/interfaces/sessionStorageModel';
import { Department } from 'src/app/shared/models/common.model';
import { CommonHttpService } from 'src/app/shared/services/common-http/common-http.service';
import { CommunicationService } from 'src/app/shared/services/communication/communication.service';

@Component({
  selector: 'app-list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.scss']
})
export class ListDepartmentsComponent {

  
  currentUserData$: Subscription;
  ngbModalRef: NgbModalRef;
  onCloseModal$: Subscription;
  currentUser: User;

  constructor(private commonHttpService: CommonHttpService,
              private communicationService: CommunicationService,
              private router: Router,
              private modalService: NgbModal) 
  { 
    this.currentUserData$ = this.communicationService.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    // To Do: implement interceptor
  }

  openaddEditDepartmentModal(obj?: Department){
    this.ngbModalRef = this.modalService.open(AddCommonModalComponent, { windowClass : "custom-modal"});
    this.ngbModalRef.componentInstance.id = obj ? obj.id : null;
    this.ngbModalRef.componentInstance.value = obj ? obj.departmentName : null;
    this.ngbModalRef.componentInstance.title = 'Department';
    this.ngbModalRef.componentInstance.fieldName = 'Department Name';
    this.ngbModalRef.componentInstance.placeholder = 'Enter Department Name';
    if(this.onCloseModal$){
      this.onCloseModal$.unsubscribe();
    }
    this.onCloseModal$ = this.ngbModalRef.componentInstance.onClose.subscribe((response: any) => {
      if (response) {
        this.addUpdateDepartment(response, obj);
      }
    });
  }

  addUpdateDepartment(departmentName: string, obj?: Department){
    this.commonHttpService.post({
      uri: '/department/addDepartment',
      object: {
        id : obj ? obj.id : null,
        departmentName: departmentName,
        status: obj ? obj.status : true
      }
    }).subscribe((response: any) => {
      console.log(response);
    });
  }

  goBack(){

  }

  ngOnDestroy(): void {
    if(this.currentUserData$){
      this.currentUserData$.unsubscribe();
    }
    if(this.onCloseModal$){
      this.onCloseModal$.unsubscribe();
    }
  }
}
