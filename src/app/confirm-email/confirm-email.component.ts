import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from '../shared/modals/success-modal/success-modal.component';
import { AuthenticationService } from '../shared/services/authentication.service';
import { DataTransfertService } from '../shared/services/data-transfert.service';
import { RegResp } from '../_interfaces/registrationResponse';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  private token: string;
  private userId: string;
  email:string;
  bsModalRef?:BsModalRef;
  constructor(
    private data : DataTransfertService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private modal: BsModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.userId = this.route.snapshot.queryParams['uid'];
    //this.email=this.data.getEmail();
    this.succeee();
  }
  succeee(){
    const confirm={
      uid:this.userId,
      token:this.token,
      //email:"tjaaouantaha@gmail.com"
    }
    let queryParams = new HttpParams();
    queryParams = queryParams.append("uid", this.userId);
    queryParams = queryParams.append("token", this.token);

    //console.log("email :"+confirm.email);
    console.log("uid :"+confirm.uid);
    console.log("token :"+confirm.token)
    this.authService.confirmPassword("api/Auth/confirm-email", queryParams)
    .subscribe({
      next: (responce:RegResp) => {
        console.log("AA email:"+responce.IsAuthenticated)
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: 'Successful registration',
            okButtonText: 'OK'
          }
        };
  
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.router.navigateByUrl('/authentication/auth/1'));
        console.log("Successful registration");
        
    },
      error: (err: HttpErrorResponse) => err
    })
    // if(this.token!=null){
    //   const config: ModalOptions = {
    //     initialState: {
    //       modalHeaderText: 'Success Message',
    //       modalBodyText: 'Successful registration',
    //       okButtonText: 'OK'
    //     }
    //   };

    //   this.bsModalRef = this.modal.show(SuccessModalComponent, config);
    //   this.bsModalRef.content.redirectOnOk.subscribe(_ => this.router.navigateByUrl('/authentication/auth/1'));
    // }
  }
}
