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
import { User } from 'src/app/_interfaces/User.model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { 

  }
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
  public getMe=(route: string)=>{
    return this.http.get<User>(this.createCompleteRoute(route, this.envUrl.urlAddress),{
      headers: new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("jwt")}`})
    });
}
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

}
