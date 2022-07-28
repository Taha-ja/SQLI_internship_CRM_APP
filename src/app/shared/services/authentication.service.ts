import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticatedResponse } from 'src/app/_interfaces/authenticatedResponse.model';
import { LoginModel } from 'src/app/_interfaces/login.model';
import { UserRegistration } from 'src/app/_interfaces/registration.model';
import { RegistrationResponse } from 'src/app/_interfaces/registrationResponse.model';
import { EnvironmentUrlService } from './environment-url.service';
import { EmailCheck } from 'src/app/_interfaces/email.model';
import { RegResp } from 'src/app/_interfaces/registrationResponse';
import { UserForRegistration } from 'src/app/_interfaces/userForRegistration.model';
import { ForgotPassword } from 'src/app/_interfaces/forgotPassword.model';
import { ResetPasswordDto } from 'src/app/_interfaces/resetPassword.model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }
  public registerUser = (route: string, body: UserForRegistration) => {
    return this.http.post<RegResp> (this.createCompleteRoute(route, this.envUrl.urlAddress), body,{
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    });
  }
  public login = (route: string,cridential:LoginModel) => {
    return this.http.post<AuthenticatedResponse>(this.createCompleteRoute(route, this.envUrl.urlAddress),cridential,{
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    });
  }
  public checkEmail=(route: string,email:EmailCheck) => {
    return this.http.post<RegistrationResponse>(this.createCompleteRoute(route, this.envUrl.urlAddress),email,{
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    })
    ;
  }
  public forgotPassword = (route: string, body: ForgotPassword) => {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body,{
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    });
  }
  public resetPassword = (route: string, body: ResetPasswordDto) => {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }
  public confirmPassword = (route: string, queryParams: any) => {
    return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress), {params: queryParams});
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

}
