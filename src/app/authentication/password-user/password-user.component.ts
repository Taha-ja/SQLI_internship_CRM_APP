import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
import { LoginModel } from 'src/app/_interfaces/login.model';
import { UserRegistration } from 'src/app/_interfaces/registration.model';
import { UserForRegistration } from 'src/app/_interfaces/userForRegistration.model';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { RegResp } from 'src/app/_interfaces/registrationResponse';
import { ErrorModalComponent } from 'src/app/shared/modals/error-modal/error-modal.component';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-password-user',
  templateUrl: './password-user.component.html',
  styleUrls: ['./password-user.component.scss']
})
export class PasswordUserComponent implements OnInit {
  isNotEqual: boolean=false;
  registerForm: FormGroup;
  isError:boolean=false;
  bsModalRef?:BsModalRef;
  IsAuthenticated:boolean;
  private token: string;
  private userId: string;
  showSuccess: boolean;
  showError: boolean;
  successMessage: string;
  errorMessage:string;
  errMessage: string;
  loading:boolean=false;
  isExisted:boolean=false;
  lang:string;
  //email:string;
  loginModel:LoginModel = {email:'', password:''};
  userResgister:UserForRegistration={
  FirstName: "",
  LastName: "",
  Email: "",
  Password: ""
};
  constructor(private authService: AuthenticationService,
              private router: Router,
              private data :DataTransfertService,
              private modal: BsModalService,
              private route: ActivatedRoute,
              private languageService :LanguageService,
              public translate: TranslateService, 
              ) { 

              }
  ngOnInit(){
    this.lang=this.languageService.Arinput();
    this.loginModel.email=this.data.getEmail();
    console.log(this.loginModel.email);
    this.registerForm = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
      confirm: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ]))
    });

  }
  public validateControl = (controlName: string) => {
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName).hasError(errorName)
  }
  public registerUser = (registerFormValue) => {
    this.lang=this.languageService.Arinput();
    this.loading=true;
    this.isError=false;
    this.isExisted=false;
    this.isNotEqual=false;
    this.registerForm.disable();
    const formValues = { ...registerFormValue };
    const user: UserRegistration = {
      password: formValues.password,
      confirmPassword: formValues.confirm
    };
    if(user.password==user.confirmPassword){
      this.userResgister.Password=user.password;
      this.userResgister.Email=this.data.getEmail();
      //this.userResgister.FirstName=this.data.getfirstname();
      this.userResgister.FirstName="Taha";
      this.userResgister.LastName="JAAOUAN";
      //this.userResgister.LastName=this.data.getlastname();
      this.authService.registerUser("api/Auth/register", this.userResgister)
      .subscribe({
        next: (_) => {
          //this.IsAuthenticated=responce.IsAuthenticated;
          this.loading=false;
          this.registerForm.enable();
          this.translate.get(["AddPassword.successMessage.title","AddPassword.successMessage.body","AddPassword.successMessage.button"]).subscribe(tab =>{
            const config: ModalOptions = {
              initialState: {
                modalHeaderText: tab["AddPassword.successMessage.title"],
                modalBodyText: tab["AddPassword.successMessage.body"],
                okButtonText: tab["AddPassword.successMessage.button"]
              }
            };
            this.bsModalRef = this.modal.show(SuccessModalComponent, config);
            this.bsModalRef.content.redirectOnOk.subscribe(_ => window.location.href = 'https://mail.google.com/mail/u/0/#inbox');
          })

    

          // console.log("Successful registration");
          
      },
        error: (error) => {
          this.loading=false;
          this.registerForm.enable();
          var result = JSON.parse(JSON.stringify(error))
          //console.log( result?.error);
          this.errMessage=result?.error;
          console.log(this.errMessage.slice(0,-2));
          if(this.errMessage=="Email is already registered!"){
            this.isExisted=true;
          }
          if(this.errMessage!='')this.loading=false;
          if(this.errMessage.length>200){
            this.translate.get(["AddPassword.EchecMessage.title","AddPassword.EchecMessage.body","AddPassword.EchecMessage.button"]).subscribe(tab =>{

              const config: ModalOptions = {
                initialState: {
                  modalHeaderText: tab["AddPassword.EchecMessage.title"],
                  modalBodyText: tab["AddPassword.EchecMessage.body"],
                  okButtonText: tab["AddPassword.EchecMessage.button"]
                }
              };
              this.isError=false;
              this.bsModalRef = this.modal.show(ErrorModalComponent, config);
              
              this.bsModalRef.content.redirectOnOk.subscribe(_ => window.location.reload());
            });

          }
          else{
            this.translate.get("AddPassword.noteNotRespected").subscribe(connFailed=>this.errorMessage=connFailed);
            //this.errorMessage="connection failed please check you internet connection";
            this.isError=true;
            this.registerForm.enable();

          }

        }
      })
    }
    else{
      this.isNotEqual=true;
      this.loading=false;
      this.registerForm.enable();
    }

  }
}
