import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataTransfertService } from '../shared/services/data-transfert.service';

@Injectable({
    providedIn: 'root'
})
export class RegisGuard implements CanActivate {

    constructor(private router: Router, private data:DataTransfertService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("AA "+this.data.getEmail());
        if (this.data.getEmail()!=null) {

            return true;
        }
        this.router.navigate(["/authentication/auth/0"]);

        return false;
    }
}