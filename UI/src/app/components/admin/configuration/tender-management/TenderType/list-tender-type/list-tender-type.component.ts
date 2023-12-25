import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddCommonModalComponent } from 'src/app/shared/components/add-common-modal/add-common-modal.component';
import { User } from 'src/app/shared/interfaces/sessionStorageModel';
import { TenderType } from 'src/app/shared/models/common.model';
import { CommonHttpService } from 'src/app/shared/services/common-http/common-http.service';
import { CommunicationService } from 'src/app/shared/services/communication/communication.service';

@Component({
  selector: 'app-list-tender-type',
  templateUrl: './list-tender-type.component.html',
  styleUrls: ['./list-tender-type.component.scss']
})
export class ListTenderTypeComponent {

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

  openaddEditTenderStageModal(obj?: TenderType){
    this.ngbModalRef = this.modalService.open(AddCommonModalComponent, { windowClass : "custom-modal"});
    this.ngbModalRef.componentInstance.id = obj ? obj.id : null;
    this.ngbModalRef.componentInstance.value = obj ? obj.tenderTypeName : null;
    this.ngbModalRef.componentInstance.title = 'Tender Type';
    this.ngbModalRef.componentInstance.fieldName = 'Type Name';
    this.ngbModalRef.componentInstance.placeholder = 'Enter Type Name';
    if(this.onCloseModal$){
      this.onCloseModal$.unsubscribe();
    }
    this.onCloseModal$ = this.ngbModalRef.componentInstance.onClose.subscribe((response: any) => {
      if (response) {
        this.addUpdateTenderStage(response, obj);
      }
    });
  }

  addUpdateTenderStage(stageName: string, obj?: TenderType){
    this.commonHttpService.post({
      uri: '/tender/type/addTenderType',
      object: {
        id : obj ? obj.id : null,
        tenderStageName: stageName,
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
