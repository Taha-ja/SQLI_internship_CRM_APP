import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, Observable } from 'rxjs';

import { EmailCheck } from 'src/app/_interfaces/email.model';

import { EnvironmentUrlService } from './environment-url.service';

const API_URL = 'http://localhost:7290/';

@Injectable({
    providedIn: 'root'
})


export class DashboardService {

    route: string;
    email :EmailCheck;
    private profileDetails$: Observable<any>;
    constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }
    public opportunities=(route: string)=>{
        return this.http.get<any>(this.createCompleteRoute(route, this.envUrl.urlAddress),{
            headers: new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("jwt")}`})
        });
    }
    
    public getProfileByUser=(route: string,email :EmailCheck) => {
        return this.http.post<any>(this.createCompleteRoute(route, this.envUrl.urlAddress),email,{
            headers: new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("jwt")}`})
        })
        ;
    }
    public confirmPassword = (route: string, queryParams: any) => {
        return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress), { params: queryParams });
    }
    private createCompleteRoute = (route: string, envAddress: string) => {
        return `${envAddress}/${route}`;
    }

    updateProfile(route: string, userDetails: any) {
        return this.http.put<any>(`${this.createCompleteRoute(route, this.envUrl.urlAddress)}`, userDetails, {
            headers: new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("jwt")}`})
        })
    }

    clearCache() {
        this.profileDetails$ = null;
    }
    
}
