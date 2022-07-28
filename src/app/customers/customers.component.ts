import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from '../shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: any;

  constructor(private http: HttpClient,
    private bsModalRef: BsModalRef,
    private route: ActivatedRoute,
    private modal: BsModalService,
    private router: Router) { }

  ngOnInit(): void {
    this.http.get("https://localhost:7182/api/customers")
    .subscribe({
      next: (result: any) => this.customers = result,
      error: (err: HttpErrorResponse) => console.log(err)
    })

  }


}