import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { forEach } from 'lodash';
import { Subscription } from 'rxjs';
import { AddCommonModalComponent } from 'src/app/shared/components/add-common-modal/add-common-modal.component';
import { User } from 'src/app/shared/interfaces/sessionStorageModel';
import { ApplyTableExtraInfo, TableColumn, TenderStage, commontTableDataType } from 'src/app/shared/models/common.model';
import { CommonHttpService } from 'src/app/shared/services/common-http/common-http.service';
import { CommunicationService } from 'src/app/shared/services/communication/communication.service';

@Component({
  selector: 'app-list-tender-stage',
  templateUrl: './list-tender-stage.component.html',
  styleUrls: ['./list-tender-stage.component.scss']
})
export class ListTenderStageComponent {
  
  currentUserData$: Subscription;
  ngbModalRef: NgbModalRef;
  onCloseModal$: Subscription;
  currentUser: User;
  wholeTableData: any;
  tableColumns: TableColumn[];
  tenderStages: TenderStage[];
  applyExtraInfo: ApplyTableExtraInfo;

  constructor(private commonHttpService: CommonHttpService,
              private communicationService: CommunicationService,
              private router: Router,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) 
  { 
    this.currentUserData$ = this.communicationService.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
    });

    this.applyExtraInfo = {
      tableClass: 'dt-init user-list',
      title: 'All Roles',
      createNewBtnText: 'Create New Role',
      actions: [{
        label: "Approve",
        cssClass: "btn-success me-2",
        onClick:(data: any): void => {
          this.changeTenderStageStatus(data, true);
        },
      },
      {
        label: "Reject",
        cssClass:"btn-danger",
        onClick:(data: any): void => {
          this.changeTenderStageStatus(data, false);
        },
      }]
    }
  }

  ngOnInit(): void {
    // To Do: implement interceptor
    this.getAllTenderStager();
  }

  
  getAllTenderStager(){
    this.commonHttpService.get({
      uri: `/tender/stage/getAllTenderStage`
    }).subscribe(response => {
      this.tenderStages = response;
      this.prepareTableData();
    });
  }

  prepareTableData(){
    this.tableColumns = [
      {
        field: 'tenderStageName',
        header: 'Tender Stage Name',
      },
      {
        field: 'status',
        header: 'Status',
        dataType: commontTableDataType.innerHtml
      },
    ];
    forEach(this.tenderStages, tenderStage => {
      tenderStage.statusHtml = `<span class="badge rounded-pill ${tenderStage ? 'bg-success' : 'bg-danger'} mt-2">${tenderStage.status ? 'Approved' : 'Rejected'}</span>`;
    })
    this.wholeTableData = {
      columns: this.tableColumns,
      data: this.tenderStages
    }
  }

  changeTenderStageStatus(tenderStafe: TenderStage, status: boolean){
    console.log(tenderStafe, status);
  }


  openaddEditTenderStageModal(obj?: TenderStage){
    this.ngbModalRef = this.modalService.open(AddCommonModalComponent, { windowClass : "custom-modal"});
    this.ngbModalRef.componentInstance.id = obj ? obj.id : null;
    this.ngbModalRef.componentInstance.value = obj ? obj.tenderStageName : null;
    this.ngbModalRef.componentInstance.title = 'Tender Stage';
    this.ngbModalRef.componentInstance.fieldName = 'Stage Name';
    this.ngbModalRef.componentInstance.placeholder = 'Enter Stage Name';
    if(this.onCloseModal$){
      this.onCloseModal$.unsubscribe();
    }
    this.onCloseModal$ = this.ngbModalRef.componentInstance.onClose.subscribe((response: any) => {
      if (response) {
        this.addUpdateTenderStage(response, obj);
      }
    });
  }

  addUpdateTenderStage(stageName: string, obj?: TenderStage){
    this.commonHttpService.post({
      uri: '/tender/stage/addTenderStage',
      object: {
        id : obj ? obj.id : null,
        tenderStageName: stageName,
        status: obj ? obj.status : true
      }
    }).subscribe((response: any) => {
      console.log(response);
      this.tenderStages.push(response);
      this.prepareTableData();
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
