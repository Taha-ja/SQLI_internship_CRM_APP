import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuccessModalComponent } from './shared/modals/success-modal/success-modal.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from './shared/modals/error-modal/error-modal.component';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';



export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    SuccessModalComponent,
    ConfirmEmailComponent,
    ErrorModalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DashboardRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7182"],
        disallowedRoutes: []
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
