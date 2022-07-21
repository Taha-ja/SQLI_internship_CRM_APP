import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
import { LoginModel } from 'src/app/_interfaces/login.model';
import { UserRegistration } from 'src/app/_interfaces/registration.model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  @Output() isLogin:boolean;
  invalidRegistration: boolean;
  registerForm: FormGroup;
  credentials: LoginModel = {username:'', password:''};
  constructor(private authService: AuthenticationService,
              private router:Router,
              private data :DataTransfertService) { }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      // password: new FormControl('', [Validators.required]),
      // confirm: new FormControl('')
    });
  }
  checkAndPass(){
    // this.router.navigate(['/authentication/auth/1'], {state: {data:this.registerUser.get("email")}})
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName).hasError(errorName)
  }
  public  registerUser = (registerFormValue) => {
    //const apiAddress: string = 'api/accounts/registration';
    const formValues = {...registerFormValue} ;
    const user: UserRegistration = {
      email: formValues.email,
      // password: formValues.password,
      // confirmPassword: formValues.confirm
    };
    this.data.setEmail(user.email);
    this.router.navigate(['/authentication/auth/2'])
    // this.authService.registerUser(apiAddress, user)
    // .subscribe({
    //   next: (_) => console.log("Successful registration"),
    //   error: (err: HttpErrorResponse) => this.invalidRegistration = true
    // })
  }

}
