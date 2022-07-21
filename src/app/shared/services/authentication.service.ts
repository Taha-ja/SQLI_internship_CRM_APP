import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticatedResponse } from 'src/app/_interfaces/authenticatedResponse.model';
import { LoginModel } from 'src/app/_interfaces/login.model';
import { UserRegistration } from 'src/app/_interfaces/registration.model';
import { RegistrationResponse } from 'src/app/_interfaces/registrationResponse.model';
import { EnvironmentUrlService } from './environment-url.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }
  public registerUser = (route: string, body: UserRegistration) => {
    return this.http.post<RegistrationResponse> (this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }
  public login = (route: string,cridential:LoginModel) => {
    return this.http.post<AuthenticatedResponse>(this.createCompleteRoute(route, this.envUrl.urlAddress),cridential,{
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    });
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

}
