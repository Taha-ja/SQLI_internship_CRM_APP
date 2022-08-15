import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
import { LoginModel } from 'src/app/_interfaces/login.model';
import { UserRegistration } from 'src/app/_interfaces/registration.model';
import { RegistrationResponse } from 'src/app/_interfaces/registrationResponse.model';
import { EmailCheck } from 'src/app/_interfaces/email.model';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  // @Output() isLogin:boolean;
  invalidRegistration: boolean;
  registerForm: FormGroup;
  credentials: LoginModel = {email:'', password:''};
  isEmailExist:boolean=true;
  emailCheck:EmailCheck={email:''};
  loading:boolean=false;
  isError:boolean;
  lang:string;
  alert:any;
  constructor(private authService: AuthenticationService,
              private router:Router,
              private data :DataTransfertService,
              private languageService :LanguageService ) { }
  ngOnInit(): void {
    this.lang=this.languageService.Arinput();
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      // password: new FormControl('', [Validators.required]),
      // confirm: new FormControl('')
    });
  }
  checkAndPass(){
    // this.router.navigate(['/authentication/auth/1'], {state: {data:this.registerUser.get("email")}})
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
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName).hasError(errorName)
  }
  public  registerUser = async (registerFormValue) => {
    this.lang=this.languageService.Arinput();
    this.disableLink();
    this.loading=true;
    this.registerForm.disable();
    let fake=document.getElementById("fake");
    fake.innerHTML="1";
    //const apiAddress: string = 'api/accounts/registration';
    const formValues = {...registerFormValue} ;
    const user: UserRegistration = {
      email: formValues.email,
      // password: formValues.password,
      // confirmPassword: formValues.confirm
    };

    this.emailCheck.email=user.email;
    const apiAddress="api/Auth/checkEmail";

    this.authService.checkEmail(apiAddress, this.emailCheck)
    .subscribe({
      next: async (response: RegistrationResponse) => {
        this.enableLink();
        this.loading=false;
        this.registerForm.enable();
        //this.isEmailExist=response.isExisted;
        //console.log("Successful registration");
        //if(this.isEmailExist){
          this.emailCheck.email=response.email;
          this.data.setEmail(user.email);
          this.data.setfirstname(response.firstname);
          this.data.setlastname(response.lastname);
          this.router.navigate(['/authentication/auth/2'])
       // }

    },
      error: (err: HttpErrorResponse) =>{ 
        this.enableLink();
        this.isError=true;
        this.loading=false;
        this.registerForm.enable();
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
