import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-common-modal',
  templateUrl: './add-common-modal.component.html',
  styleUrls: ['./add-common-modal.component.scss']
})
export class AddCommonModalComponent {

  
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Input() id: number;
  @Input() title: string;
  @Input() fieldName: string;
  @Input() placeholder: string;
  @Input() value: string;
  formSubmitted: boolean = false;

  inputTitle: string;
  ngbModalRef: NgbModalRef;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal){
      
      this.inputTitle = this.value;
  }

  ngOnInIt(){

  }

  closeModal() {
    this.activeModal.close(false);
  }

  onSubmit(value?: string){
    this.formSubmitted = true;
    if(!this.inputTitle || this.inputTitle.trim() == '') return;
    this.onClose.emit(this.inputTitle);
    this.activeModal.close(false);
  }

}
