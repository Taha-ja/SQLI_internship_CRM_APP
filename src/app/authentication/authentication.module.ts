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
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';


export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,"../../../assets/i18n/",'.json');
}
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
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    ModalModule.forRoot(),
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class AuthenticationModule { }
