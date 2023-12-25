import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() title!: string;
  @Input() items!: any[];
  @Input() active_item!: string;
  @Input() showButtons: boolean = true;
  @Output() addNew: EventEmitter<any> = new EventEmitter();
  @Output() goBack: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitAddNew(){
    this.addNew.emit();
  }

  emitGoBack(){
    this.goBack.emit();
  }

}
