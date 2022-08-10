import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  modalHeaderText: string;
  modalBodyText: string;
  okButtonText: string;
  lang:string;
  redirectOnOk: EventEmitter<any> = new EventEmitter();

  constructor(private bsModalRef: BsModalRef,) { }

  ngOnInit(): void {
    this.lang=localStorage.getItem("keyLanguage")
  }

  onOkClicked = () => {
    this.redirectOnOk.emit();
    this.bsModalRef.hide();
  }
}
