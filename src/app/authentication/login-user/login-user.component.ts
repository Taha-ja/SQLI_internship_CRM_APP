import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  credentials: LoginModel = {username:'', password:''};

  constructor(private router: Router, private authService :AuthenticationService ) { }

  ngOnInit(): void {
    
  }
  login = ( form: NgForm) => {
    const apiAddress: string = 'api/auth/login';
    if (form.valid) {
      this.authService.login(apiAddress,this.credentials)
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          this.router.navigate(["/"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }
  }

}
