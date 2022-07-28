import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from 'src/app/shared/modals/error-modal/error-modal.component';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ForgotPassword } from 'src/app/_interfaces/forgotPassword.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup
  successMessage: string;
  errorMessage: string;
  showSuccess: boolean;
  showError: boolean;
  email:string;
  isSent:boolean;
  bsModalRef?:BsModalRef;
  constructor(
    private _authService: AuthenticationService,
    private router: Router,
    //private data :DataTransfertService,
    private modal: BsModalService,
    private route: ActivatedRoute,
    public _location: Location) { }
  
  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required])
    })
  }
  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.get(controlName).invalid && this.forgotPasswordForm.get(controlName).touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.get(controlName).hasError(errorName)
  }
  public forgotPassword = (forgotPasswordFormValue) => {
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };
    const forgotPassDto: ForgotPassword = {
      email: forgotPass.email,
      emailSent: false
    }
    this._authService.forgotPassword('api/Auth/forgot-password', forgotPassDto)
    .subscribe({
      next: (responce:ForgotPassword) => {
      this.isSent=responce.emailSent;
      if(this.isSent){
        //this.email='';
      // this.showSuccess = true;
      // this.successMessage = 'The link has been sent, please check your email to reset your password.'


      const config: ModalOptions = {
        initialState: {
          modalHeaderText: 'Success Message',
          modalBodyText: 'The link has been sent, please check your email to reset your password.',
          okButtonText: 'OK'
        }
      };

      this.bsModalRef = this.modal.show(SuccessModalComponent, config);
      this.bsModalRef.content.redirectOnOk.subscribe(_ => window.location.href = 'https://mail.google.com/mail/u/0/#inbox');






      }
      else{
        this.showError = true;
        this.errorMessage = "operation failed enter a valid email!";
      }
    },
    error: (err: HttpErrorResponse) => {
      //this.showError = true;
      //this.errorMessage = "operation failed check your internet connection";



      const config: ModalOptions = {
        initialState: {
          modalHeaderText: 'Error Message',
          modalBodyText: "operation failed check your internet connection",
          okButtonText: 'OK'
        }
      };

      this.bsModalRef = this.modal.show(ErrorModalComponent, config);
      
      this.bsModalRef.content.redirectOnOk.subscribe(_ => window.location.reload());


    }})
  }
}
function ForgotModalComponent(ForgotModalComponent: any, config: ModalOptions<Record<string, unknown>>): BsModalRef<any> {
  throw new Error('Function not implemented.');
}

