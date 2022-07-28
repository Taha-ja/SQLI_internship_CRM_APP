import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RegisGuard } from '../guards/Regis.guard';
import { ContainerComponent } from './container/container.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { PasswordUserComponent } from './password-user/password-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: 'register', component: RegisterUserComponent },
  { path: 'auth/:id', component: ContainerComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent }
  //{ path: 'password', component: PasswordUserComponent },
  // { path: 'auth/2', component: PasswordUserComponent, canActivate: [AuthGuard] },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { 

}
