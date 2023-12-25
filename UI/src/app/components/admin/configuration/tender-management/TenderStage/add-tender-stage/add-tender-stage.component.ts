import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-tender-stage',
  templateUrl: './add-tender-stage.component.html',
  styleUrls: ['./add-tender-stage.component.scss']
})
export class AddTenderStageComponent {

  
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Input() id: number;
  @Input() value: string;
  formSubmitted: boolean = false;
  ngbModalRef: NgbModalRef;

  tenderStageForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalService: NgbModal){
      this.createFormValidator();
  }

  ngOnInIt(){

  }

  createFormValidator(){
    this.tenderStageForm =this.formBuilder.group({
      id: [],
      tenderStageName: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  get tenderStageFormControls(){
    return this.tenderStageForm.controls;
  }

  closeModal() {
    this.activeModal.close(false);
  }

  onSubmit(value?: string){
    this.formSubmitted = true;
    if(this.tenderStageForm.invalid) return;
    this.onClose.emit(this.tenderStageForm.value.tenderStageName);
    this.activeModal.close(false);
  }

}
