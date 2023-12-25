import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplyTableExtraInfo, PageHeaderItem, Role, TableColumn, commontTableDataType } from 'src/app/shared/models/common.model';
import { CommonHttpService } from 'src/app/shared/services/common-http/common-http.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddCommonModalComponent } from 'src/app/shared/components/add-common-modal/add-common-modal.component';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/shared/services/communication/communication.service';
import { User, identityModel } from 'src/app/shared/interfaces/sessionStorageModel';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {

  currentUserData$: Subscription;
  ngbModalRef: NgbModalRef;
  userForm: FormGroup;
  items: PageHeaderItem[] = [];
  onCloseModal$: Subscription;
  currentUser: User;
  applyExtraInfo: ApplyTableExtraInfo;
  wholeTableData: any;
  roles: Role[];
  tableColumns: TableColumn[];

  constructor(private commonHttpService: CommonHttpService,
              private communicationService: CommunicationService,
              private router: Router,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) 
  { 
    this.applyExtraInfo = {
      tableClass: 'dt-init user-list',
      title: 'All Roles',
      createNewBtnText: 'Create New Role',
      actions: [{
        label: "Approve",
        cssClass: "btn-success me-2",
        onClick:(data: any): void => {
          this.changeRoleStatus(data, true);
        },
      },
      {
        label: "Reject",
        cssClass:"btn-danger",
        onClick:(data: any): void => {
          this.changeRoleStatus(data, false);
        },
      }]
    }
    // this.items = [
    //   {title: 'Roles', active: true},
    // ];
    this.currentUserData$ = this.communicationService.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles(){
    this.commonHttpService.get({
      uri: `/role/getAll`
    }).subscribe(response => {
      this.roles = response;
      this.prepareTableData();
    });
  }

  prepareTableData(){
    this.tableColumns = [
      {
        field: 'name',
        header: 'Name',
      },
    ];
    this.wholeTableData = {
      columns: this.tableColumns,
      data: this.roles
    }
  }

  changeRoleStatus(role: Role, status: boolean){
    console.log(role, status);
  }

  openaddEditRoleModal(obj?: Role){
    let id = obj ? obj.id : null;
    this.ngbModalRef = this.modalService.open(AddCommonModalComponent, { windowClass : "custom-modal"});
    this.ngbModalRef.componentInstance.id = id;
    this.ngbModalRef.componentInstance.value = obj ? obj.name : null;
    this.ngbModalRef.componentInstance.title = 'Role';
    this.ngbModalRef.componentInstance.fieldName = 'Name';
    this.ngbModalRef.componentInstance.placeholder = 'Enter Role Name';
    if(this.onCloseModal$){
      this.onCloseModal$.unsubscribe();
    }
    this.onCloseModal$ = this.ngbModalRef.componentInstance.onClose.subscribe((response: any) => {
      if (response) {
        this.addUpdateRole(response, id);
      }
    });
  }

  addUpdateRole(roleName: string, id: number | null){
    this.commonHttpService.post({
      uri: '/role/createOrUpdate',
      object: {
        id : id,
        name: roleName,
        status: 'Active'
      }
    }).subscribe(response => {
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
