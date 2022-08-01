import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthenticatedResponse } from 'src/app/_interfaces/authenticatedResponse.model';
import { LoginModel } from 'src/app/_interfaces/login.model';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {
  invalidLogin: boolean;
  credentials: LoginModel = {email:'', password:''};
  loading:boolean=false;
  LoginForm: FormGroup;
  
  constructor(private router: Router, private authService :AuthenticationService ) { }

  ngOnInit(): void {

    // myForm.disabled=true;
  }

  disableForm(){
    let myForm=document.querySelectorAll("input");
    let btn=document.querySelector('button').setAttribute('disabled','')
    myForm.forEach(ip => {
      ip.setAttribute('disabled','');
    });
  }
  activeForm(){
    let myForm=document.querySelectorAll("input");
    let btn=document.querySelector('button').removeAttribute('disabled')
    myForm.forEach(ip => {
      ip.removeAttribute('disabled');
    });
  }
  login = ( form: NgForm) => {
    //https://localhost:7290/api/Auth/token
    //const apiAddress: string = 'api/auth/login';
    this.disableForm();
    const apiAddress: string = 'api/Auth/token';

    this.invalidLogin = false;
    if (form.valid) {
      this.loading=true;
      this.authService.login(apiAddress,this.credentials)
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          this.activeForm();
          this.loading=false;
          const token = response.token;
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          this.router.navigate(["/dashboard/"]);
        },
        error: (err: HttpErrorResponse) => {
          this.activeForm();
          this.loading=false;
          this.invalidLogin = true;
        }
      })
    }
  }

}
