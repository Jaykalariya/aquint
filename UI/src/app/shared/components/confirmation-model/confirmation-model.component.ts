import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-model',
  templateUrl: './confirmation-model.component.html',
  styleUrls: ['./confirmation-model.component.scss']
})
export class ConfirmationModelComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal){
  
  }

  @Output() onClose: EventEmitter<any> = new EventEmitter();
  textAlign: string = 'center';
  @Input() msg: string;
  @Input() header: string;
  @Input() successBtnName: string;
  @Input() innerHtml: string;
  @Input() showCancelBtn: boolean = true;
  @Input() cancelBtnName: string;

  ngOnInit() {
    this.successBtnName = this.successBtnName || 'OK';
    this.cancelBtnName = this.cancelBtnName || 'Cancel'
  }

  closeSendReminderModal(closeIconClk = '') {
    if (closeIconClk === 'yes' && this.cancelBtnName === 'No') {
      this.activeModal.close(closeIconClk);
    } else {
      this.activeModal.close(false);
    }
  }

  onSubmit() {
    this.activeModal.close(true);  
  }
}
