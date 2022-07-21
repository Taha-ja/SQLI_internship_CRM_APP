import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
import { LoginModel } from 'src/app/_interfaces/login.model';
import { UserRegistration } from 'src/app/_interfaces/registration.model';

@Component({
  selector: 'app-password-user',
  templateUrl: './password-user.component.html',
  styleUrls: ['./password-user.component.scss']
})
export class PasswordUserComponent implements OnInit {
  isNotEqual: boolean=false;
  registerForm: FormGroup;
  isError:boolean=false;
  //email:string;
  loginModel:LoginModel = {username:'', password:''};;
  constructor(private authService: AuthenticationService,
              private router: Router,
              private data :DataTransfertService) { 

              }
  ngOnInit(){
    this.loginModel.username=this.data.getEmail();
    console.log(this.loginModel.username);
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
    const formValues = { ...registerFormValue };
    const user: UserRegistration = {
      password: formValues.password,
      confirmPassword: formValues.confirm
    };
    if(user.password==user.confirmPassword){
      this.loginModel.password=user.password;
      this.authService.registerUser("api/UserRegister/Registration", this.loginModel)
      .subscribe({
        next: (_) => {
          console.log("Successful registration");
          this.router.navigateByUrl('/authentication/auth/1');
      },
        error: (err: HttpErrorResponse) => this.isError=true
      })
    }
    else{
      this.isNotEqual=true;
    }

  }
}
