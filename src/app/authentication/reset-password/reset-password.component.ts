import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
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
              ) { 

              }
  ngOnInit(){
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
  
  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.get(controlName).invalid && this.resetPasswordForm.get(controlName).touched
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.get(controlName).hasError(errorName)
  }
  
  public resetPassword = (resetPasswordFormValue) => {
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
    error: (err: HttpErrorResponse) => {
      this.loading=false;
      this.showError = true;
      this.errorMessage = "operation failed check your internet connection";
      this.resetPasswordForm.enable();
    }})
  }
}
