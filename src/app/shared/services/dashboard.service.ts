import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OpportunityModel } from 'src/app/_interfaces/opportunity.model';

import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    readonly APIUrl = "https://localhost:7290";
    updateUser(val: any) {
        return this.http.put(this.APIUrl + '/Comptes', val);
    }
    constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }
    public opportunities=(route: string)=>{
        return this.http.get<any>(this.createCompleteRoute(route, this.envUrl.urlAddress),{
            headers: new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("jwt")}`})
        });
    }

    public confirmPassword = (route: string, queryParams: any) => {
        return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress), { params: queryParams });
    }
    private createCompleteRoute = (route: string, envAddress: string) => {
        return `${envAddress}/${route}`;
    }

}
