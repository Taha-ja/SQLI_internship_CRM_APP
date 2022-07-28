import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginUserComponent } from './login-user/login-user.component';
import { ContainerComponent } from './container/container.component';
import { PasswordUserComponent } from './password-user/password-user.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';




@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginUserComponent,
    ContainerComponent,
    PasswordUserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationRoutingModule,
    ModalModule.forRoot()
  ]
})
export class AuthenticationModule { }
