import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddCommonModalComponent } from 'src/app/shared/components/add-common-modal/add-common-modal.component';
import { User } from 'src/app/shared/interfaces/sessionStorageModel';
import { PlaceOfSupply } from 'src/app/shared/models/common.model';
import { CommonHttpService } from 'src/app/shared/services/common-http/common-http.service';
import { CommunicationService } from 'src/app/shared/services/communication/communication.service';

@Component({
  selector: 'app-list-place-of-supplies',
  templateUrl: './list-place-of-supplies.component.html',
  styleUrls: ['./list-place-of-supplies.component.scss']
})
export class ListPlaceOfSuppliesComponent {

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
    // To Do: Create personal add modal for this
  }

  openaddEditPlaceOfSupplyModal(obj?: PlaceOfSupply){
    this.ngbModalRef = this.modalService.open(AddCommonModalComponent, { windowClass : "custom-modal"});
    this.ngbModalRef.componentInstance.obj = obj ?? null;
    if(this.onCloseModal$){
      this.onCloseModal$.unsubscribe();
    }
    this.onCloseModal$ = this.ngbModalRef.componentInstance.onClose.subscribe((response: any) => {
      if (response) {
        this.addUpdatePlaceOfSupply(response);
      }
    });
  }

  addUpdatePlaceOfSupply(obj: PlaceOfSupply){
    this.commonHttpService.post({
      uri: '/placeOfSupply/addPlaceOfSupply',
      object: {
        id : obj.id ?? null,
        stateName:  obj.stateName,
        stateCode:  obj.stateCode,
        status: obj.status
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
