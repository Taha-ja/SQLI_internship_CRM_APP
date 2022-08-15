import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from 'src/app/shared/modals/error-modal/error-modal.component';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LanguageService } from 'src/app/shared/services/language.service';
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
  loading:boolean=false;
  lang:string;
  constructor(
    private _authService: AuthenticationService,
    private router: Router,
    //private data :DataTransfertService,
    private modal: BsModalService,
    private route: ActivatedRoute,
    public _location: Location,
    private languageService :LanguageService,
    public translate: TranslateService,) { }
  
  ngOnInit(): void {
    this.lang=this.languageService.Arinput();
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required])
    })
  }
  disableLink(){
    let a=document.querySelector('.lin');
    a.classList.add("disabled");
  }
  enableLink(){
    let a=document.querySelector('.lin');
    a.classList.remove("disabled");
  }
  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.get(controlName).invalid && this.forgotPasswordForm.get(controlName).touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.get(controlName).hasError(errorName)
  }
  public forgotPassword = (forgotPasswordFormValue) => {
    this.lang=this.languageService.Arinput();
    this.disableLink();
    this.loading=true;
    this.forgotPasswordForm.disable();
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };
    const forgotPassDto: ForgotPassword = {
      email: forgotPass.email,
      emailSent: false
    }
    this._authService.forgotPassword('api/Auth/forgot-password', forgotPassDto)
    .subscribe({
      next: (responce:ForgotPassword) => {
      this.enableLink();
      this.forgotPasswordForm.enable();
      this.loading=false;
      this.isSent=responce.emailSent;
      if(this.isSent){
        //this.email='';
      // this.showSuccess = true;
      // this.successMessage = 'The link has been sent, please check your email to reset your password.'



      this.translate.get(["ForgotPassword.successMessage.title","ForgotPassword.successMessage.body","ForgotPassword.successMessage.button"]).subscribe(tab =>{
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: tab["ForgotPassword.successMessage.title"],
            modalBodyText: tab["ForgotPassword.successMessage.body"],
            okButtonText: tab["ForgotPassword.successMessage.button"]
          }
        };
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => window.location.href = 'https://mail.google.com/mail/u/0/#inbox');
      })
      }
      else{
        this.loading=false;
        this.showError = true;
        this.translate.get("ForgotPassword.ErrorMessage").subscribe(errMsg=>this.errorMessage=errMsg);
        // this.errorMessage = "operation failed enter a valid email!";
      }
    },
    error: (err: HttpErrorResponse) => {
      this.enableLink();
      this.forgotPasswordForm.enable();
      this.loading=false;
      //this.showError = true;
      //this.errorMessage = "operation failed check your internet connection";


      this.translate.get(["ForgotPassword.EchecMessage.title","ForgotPassword.EchecMessage.body","ForgotPassword.EchecMessage.button"]).subscribe(tab =>{

        const config: ModalOptions = {
          initialState: {
            modalHeaderText: tab["ForgotPassword.EchecMessage.title"],
            modalBodyText: tab["ForgotPassword.EchecMessage.body"],
            okButtonText: tab["ForgotPassword.EchecMessage.button"]
          }
        };
        this.bsModalRef = this.modal.show(ErrorModalComponent, config);
        
        this.bsModalRef.content.redirectOnOk.subscribe(_ => window.location.reload());
      });


    }})
  }
}


