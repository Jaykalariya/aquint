import { Component, Input, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    console.log(this.items);
  }

}
