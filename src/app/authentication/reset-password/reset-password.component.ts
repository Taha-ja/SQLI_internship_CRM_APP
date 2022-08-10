import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { ResetPasswordDto } from 'src/app/_interfaces/resetPassword.model';
import { UserForRegistration } from 'src/app/_interfaces/userForRegistration.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;
  isSuccess:boolean=false;
  private token: string;
  private userId: string;
  bsModalRef?:BsModalRef;
  loading:boolean=false;
  lang:string;
  alert:any;
//   resetPassowordDtoResgister:ResetPasswordDto={
//     password: "",
//     confirmPassword:"",
//     token: "",
//     userId:"",
//     message:"",
//     isSuccess:false
// };
  constructor(private authService: AuthenticationService,
              private router: Router,
              private data :DataTransfertService,
              private modal: BsModalService,
              private route: ActivatedRoute,
              private languageService :LanguageService ,
              public translate: TranslateService, 
              ) { 

              }
  ngOnInit(){
    this.lang=this.languageService.Arinput();
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
      confirm: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ]))
    });
    this.token = this.route.snapshot.queryParams['token'];
    this.userId = this.route.snapshot.queryParams['uid'];

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
    return this.resetPasswordForm.get(controlName).invalid && this.resetPasswordForm.get(controlName).touched
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.get(controlName).hasError(errorName)
  }
  
  public resetPassword = (resetPasswordFormValue) => {
    this.lang=this.languageService.Arinput();
    this.disableLink();
    let fake=document.getElementById("fake");
    fake.innerHTML="1";
    this.loading=true;
    this.resetPasswordForm.disable();
    this.showError = this.showSuccess = false;
    const resetPass = { ... resetPasswordFormValue };
  
    const resetPassDto: ResetPasswordDto = {
      newPassword: resetPass.password,
      confirmNewPassword: resetPass.confirm,
      token: this.token,
      userId: this.userId,
      message: '',
      isSuccess: false
    }
  
    this.authService.resetPassword('api/Auth/reset-password', resetPassDto)
    .subscribe({
      next:(responce:ResetPasswordDto) =>{
        this.enableLink();
        this.loading=false;
        this.isSuccess=responce.isSuccess;
        if(this.isSuccess){
            const config: ModalOptions = {
            initialState: {
              modalHeaderText: 'Success Message',
              modalBodyText: 'Successful registration',
              okButtonText: 'OK'
            }
          };
          this.bsModalRef = this.modal.show(SuccessModalComponent, config);
          this.bsModalRef.content.redirectOnOk.subscribe(_ => this.router.navigateByUrl('/authentication/auth/1'));
        }
        this.showSuccess = true;
      },
    error: async (err: HttpErrorResponse) => {
      this.enableLink();
      this.loading=false;
      this.showError = true;
      this.translate.get("connectionFailed").subscribe(connFailed=>this.errorMessage=connFailed);
      this.resetPasswordForm.enable();
      setTimeout(()=>{
        function removeAlert(){
          this.alert=document.getElementById("errorAlert");
          fake.innerHTML= ((+fake.innerHTML)-0.01).toString().slice(0,3);
          this.alert.style.opacity=fake.innerHTML;
          if(fake.innerHTML=="0.0"){
            this.alert.style.display="none"
            clearInterval(alt);
          }
          
          }
        let alt=setInterval(removeAlert,200);
      },3000)
    }
})
}
}
