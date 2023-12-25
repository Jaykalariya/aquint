import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TableColumn, TableData, commontTableDataType } from '../../models/common.model';
import { MatTableDataSource } from '@angular/material/table';
import { forEach } from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ApplyTableExtraInfo } from '../../models/common.model';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements AfterViewInit {

  tableData: any;
  commontTableDataType = commontTableDataType;
  loadFirstTime: boolean = true;

  @Input()
  public set tableFullData(wholeTableData: TableData) {
    this.tableData = wholeTableData;
    if (wholeTableData && wholeTableData.data){
      this.setTableData();
    }
  };

  @Input()
  applyExtraInfo: ApplyTableExtraInfo;

  @Input()
  showViewDetailsBtn: boolean;

  @Input()
  showEditBtn: boolean;

  @Input()
  showDeleteBtn: boolean = false;

  @Input()
  showPagination: boolean = true;

  @Input()
  showFilters: boolean = true;

  @Input()
  viewPublicLinkBtn: boolean = false;
  
  @Input()
  viewPdfBtn: boolean = false;
  
  @Input()
  reScheduleBtn: boolean = false;
  
  @Input()
  displayActionConditionally: boolean | null = null;

  @Output() editOption: EventEmitter<any> = new EventEmitter(); // edit option function
  @Output() viewDetailOptions: EventEmitter<any> = new EventEmitter(); // edit option function
  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() create2: EventEmitter<any> = new EventEmitter();
  @Output() generalNewBtn: EventEmitter<any> = new EventEmitter();
  @Output() viewPublicLink: EventEmitter<any> = new EventEmitter();
  @Output() viewPdf: EventEmitter<any> = new EventEmitter();
  @Output() deleteRec: EventEmitter<any> = new EventEmitter();
  @Output() reScheduleEmmiter: EventEmitter<any> = new EventEmitter();

  matDataSource: MatTableDataSource<any>;
  displayedColumns: string[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  sort: any;
  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort && this.matDataSource){
      this.matDataSource.sort = this.sort;
    }
  }

  constructor(
    private router: Router
  ) {
  }

  ngAfterViewInit(): void {
    this.setTableData();
  }

  ngOnInIt(){
    // this.setTableData();
  }

  setTableData(){

    if(!this.tableData){
      return;
    }

    this.displayedColumns = [];
    this.loadFirstTime = false;
    // Assign the data to the data source for the table to render
    this.matDataSource = new MatTableDataSource(this.tableData.data);
    forEach(this.tableData.columns, (column) => {
      this.displayedColumns.push(column.field);
    });
    if(this.showEditBtn || this.showViewDetailsBtn || this.viewPublicLinkBtn || this.viewPdfBtn || this.reScheduleBtn || this.showDeleteBtn || this.applyExtraInfo?.actions){
      this.displayedColumns.push("actions")
    }

    if(this.showPagination){
      this.matDataSource.paginator = this.paginator;
    }
    this.matDataSource.sort = this.sort;
  }

  viewDetails(rowData: any){
    this.viewDetailOptions.emit(rowData);
  }

  editDetails(rowData: any){
    this.editOption.emit(rowData);
  }

  createNewData(){
    this.create.emit();
  }
  
  createNewData2(){
    this.create2.emit();
  }

  generalFunc(){
    this.generalNewBtn.emit();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.matDataSource.filter = filterValue.trim().toLowerCase();

    if (this.matDataSource.paginator) {
      this.matDataSource.paginator.firstPage();
    }
  }

  actionButtonPressed(onClickFunction: any, rowData: any){
    onClickFunction(rowData);
  }

  viewpublicLink(rowData: any){
    this.viewPublicLink.emit(rowData);
  }
  
  viewPdfFunc(rowData: any){
    this.viewPdf.emit(rowData);
  }
 
  reSchedule(rowData: any){
    this.reScheduleEmmiter.emit(rowData);
  }

  deleteRecord(rowData: any){
    this.deleteRec.emit(rowData);
  }
}
