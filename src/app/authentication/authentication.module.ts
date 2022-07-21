import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginUserComponent } from './login-user/login-user.component';
import { ContainerComponent } from './container/container.component';
import { PasswordUserComponent } from './password-user/password-user.component';




@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginUserComponent,
    ContainerComponent,
    PasswordUserComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationRoutingModule,
  ]
})
export class AuthenticationModule { }
