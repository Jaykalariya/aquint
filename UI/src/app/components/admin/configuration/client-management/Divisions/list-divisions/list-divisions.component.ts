import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddCommonModalComponent } from 'src/app/shared/components/add-common-modal/add-common-modal.component';
import { User } from 'src/app/shared/interfaces/sessionStorageModel';
import { Division } from 'src/app/shared/models/common.model';
import { CommonHttpService } from 'src/app/shared/services/common-http/common-http.service';
import { CommunicationService } from 'src/app/shared/services/communication/communication.service';

@Component({
  selector: 'app-list-divisions',
  templateUrl: './list-divisions.component.html',
  styleUrls: ['./list-divisions.component.scss']
})
export class ListDivisionsComponent {

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

  openaddEditDivisionModal(obj?: Division){
    this.ngbModalRef = this.modalService.open(AddCommonModalComponent, { windowClass : "custom-modal"});
    this.ngbModalRef.componentInstance.id = obj ? obj.id : null;
    this.ngbModalRef.componentInstance.value = obj ? obj.divisionName : null;
    this.ngbModalRef.componentInstance.title = 'Division';
    this.ngbModalRef.componentInstance.fieldName = 'Division Name';
    this.ngbModalRef.componentInstance.placeholder = 'Enter Division Name';
    if(this.onCloseModal$){
      this.onCloseModal$.unsubscribe();
    }
    this.onCloseModal$ = this.ngbModalRef.componentInstance.onClose.subscribe((response: any) => {
      if (response) {
        this.addUpdateDivision(response, obj);
      }
    });
  }

  addUpdateDivision(divisionName: string, obj?: Division){
    this.commonHttpService.post({
      uri: '/division/addDivision',
      object: {
        id : obj ? obj.id : null,
        divisionName: divisionName,
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
