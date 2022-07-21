import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './authentication/container/container.component';
import { LoginUserComponent } from './authentication/login-user/login-user.component';
import { PasswordUserComponent } from './authentication/password-user/password-user.component';
import { CustomersComponent } from './customers/customers.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisGuard } from './guards/Regis.guard';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: '', component: ContainerComponent },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'authentication/auth/2', component: PasswordUserComponent, canActivate: [RegisGuard] },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
