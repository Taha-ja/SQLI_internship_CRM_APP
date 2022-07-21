import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RegisGuard } from '../guards/Regis.guard';
import { ContainerComponent } from './container/container.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { PasswordUserComponent } from './password-user/password-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  { path: 'register', component: RegisterUserComponent },
  { path: 'auth/:id', component: ContainerComponent },
  { path: 'login', component: LoginUserComponent },
  //{ path: 'password', component: PasswordUserComponent },
  // { path: 'auth/2', component: PasswordUserComponent, canActivate: [AuthGuard] },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { 

}
