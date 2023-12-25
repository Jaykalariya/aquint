import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddCommonModalComponent } from 'src/app/shared/components/add-common-modal/add-common-modal.component';
import { User } from 'src/app/shared/interfaces/sessionStorageModel';
import { Product } from 'src/app/shared/models/common.model';
import { CommonHttpService } from 'src/app/shared/services/common-http/common-http.service';
import { CommunicationService } from 'src/app/shared/services/communication/communication.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {

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
  }

  openaddEditTenderStageModal(obj?: Product){
    this.ngbModalRef = this.modalService.open(AddCommonModalComponent, { windowClass : "custom-modal"});
    this.ngbModalRef.componentInstance.id = obj ? obj.id : null;
    this.ngbModalRef.componentInstance.value = obj ? obj.name : null;
    this.ngbModalRef.componentInstance.title = 'Product';
    this.ngbModalRef.componentInstance.fieldName = 'Product Name';
    this.ngbModalRef.componentInstance.placeholder = 'Enter Product Name';
    if(this.onCloseModal$){
      this.onCloseModal$.unsubscribe();
    }
    this.onCloseModal$ = this.ngbModalRef.componentInstance.onClose.subscribe((response: any) => {
      if (response) {
        this.addUpdateTenderStage(response, obj);
      }
    });
  }

  addUpdateTenderStage(productName: string, obj?: Product){
    this.commonHttpService.post({
      uri: '/product/addProductType',
      object: {
        id : obj ? obj.id : null,
        name: productName,
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
