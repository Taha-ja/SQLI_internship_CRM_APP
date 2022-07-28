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
  errorMessage: string;
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
              private route: ActivatedRoute
              ) { 

              }
  ngOnInit(){
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
    // this.token = this.route.snapshot.queryParams['token'];
    // this.userId = this.route.snapshot.queryParams['uid'];
    // if(this.IsAuthenticated){
    //   const config: ModalOptions = {
    //     initialState: {
    //       modalHeaderText: 'Success Message',
    //       modalBodyText: 'Successful registration',
    //       okButtonText: 'OK'
    //     }
    //   };

    //   this.bsModalRef = this.modal.show(SuccessModalComponent, config);
    //   this.bsModalRef.content.redirectOnOk.subscribe(_ => this.router.navigateByUrl('/authentication/auth/1'));
    //   console.log("Successful registration");
    // }
  }
  public validateControl = (controlName: string) => {
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName).hasError(errorName)
  }
  public registerUser = (registerFormValue) => {
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
          const config: ModalOptions = {
            initialState: {
              modalHeaderText: 'Success Message',
              modalBodyText: 'The link has been sent, please check your email to confirm your registration',
              okButtonText: 'OK'
            }
          };
    
          this.bsModalRef = this.modal.show(SuccessModalComponent, config);
          this.bsModalRef.content.redirectOnOk.subscribe(_ => window.location.href = 'https://mail.google.com/mail/u/0/#inbox');
          // console.log("Successful registration");
          
      },
        error: (err: HttpErrorResponse) => {
          const config: ModalOptions = {
            initialState: {
              modalHeaderText: 'Error Message',
              modalBodyText: "operation failed check your internet connection",
              okButtonText: 'OK'
            }
          };
    
          this.bsModalRef = this.modal.show(ErrorModalComponent, config);
          
          this.bsModalRef.content.redirectOnOk.subscribe(_ => window.location.reload());
        }
      })
    }
    else{
      this.isNotEqual=true;
    }

  }
}
