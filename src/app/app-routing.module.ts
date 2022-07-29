import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './authentication/container/container.component';
import { LoginUserComponent } from './authentication/login-user/login-user.component';
import { PasswordUserComponent } from './authentication/password-user/password-user.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisGuard } from './guards/Regis.guard';
import { SuccessModalComponent } from './shared/modals/success-modal/success-modal.component';
const routes: Routes = [
  { path: '', component: ContainerComponent },
  { path: 'confirm', component: ConfirmEmailComponent},
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) ,canActivate: [AuthGuard] },
  //{ path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
