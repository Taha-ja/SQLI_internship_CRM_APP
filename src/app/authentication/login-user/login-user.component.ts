import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LanguageService } from 'src/app/shared/services/language.service';
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
  lang:string;
  alert:any;
  constructor(
                private router: Router,
                private authService :AuthenticationService,
                public translate: TranslateService,
                private languageService :LanguageService 
                ) { 
                  // translate.addLangs(['en', 'fr']);  
                  // translate.setDefaultLang('en');
                }
  ngOnInit(): void {
    this.lang=this.languageService.Arinput();
    // myForm.disabled=true;
  }

  disableForm(){
    let myForm=document.querySelectorAll("input");
    let btn=document.querySelector('.submit-button');
    let a=document.querySelectorAll('.lin');
    myForm.forEach(ip => {
      ip.setAttribute('disabled','');
    });
    a.forEach(lin => {
      lin.classList.add("disabled")
    });
    btn.setAttribute('disabled','');
    //btn.disabled = true;
  }
  activeForm(){
    let myForm=document.querySelectorAll("input");
    let btn=document.querySelector('.submit-button');
    let a=document.querySelectorAll('.lin');
    myForm.forEach(ip => {
      ip.removeAttribute('disabled');
    });
    a.forEach(lin => {
      lin.classList.remove("disabled")
    });
    btn.removeAttribute('disabled');
  }
  login = ( form: NgForm) => {
    //https://localhost:7290/api/Auth/token
    //const apiAddress: string = 'api/auth/login';
    this.lang=this.languageService.Arinput();
    this.disableForm();
    const apiAddress: string = 'api/Auth/token';
    let fake=document.getElementById("fake");
    fake.innerHTML="1";
    this.invalidLogin = false;
    if (form.valid) {
      this.loading=true;
      this.authService.login(apiAddress,this.credentials)
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          this.activeForm();
          this.loading=false;
          const token = response.token;
          sessionStorage.setItem("UserName",response.fullName);
          sessionStorage.setItem("Email",response.email)
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          this.router.navigate(["/dashboard/"]);
        },
        error: (err: HttpErrorResponse) => {
          this.activeForm();
          this.loading=false;
          this.invalidLogin = true;
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

}
