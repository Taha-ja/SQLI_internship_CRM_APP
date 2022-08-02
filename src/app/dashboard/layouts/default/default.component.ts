import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { DashboardService } from 'src/app/shared/services/dashboard.service';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen=true;
  isResize:boolean=false;
  windowWidth:number;
  constructor(private service:DashboardService,private jwtHelper: JwtHelperService) {
    // this.windowWidth=window.innerWidth;
    // console.log(this.windowWidth);

  }
  
  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
  
    return false;
  }
  logOut = () => {
    localStorage.removeItem("jwt");
  }
  OpportinitiesList:any=[];
  
  ngOnInit(): void {
    this.refreshOppList();
    window.addEventListener("resize", (_)=>{
      this.windowWidth=window.innerWidth;
    });

  }
  sideBarToggler(){
    this.sideBarOpen=!this.sideBarOpen;
  }
  refreshOppList(){
    this.service.opportunities("").subscribe(data=>{
      this.OpportinitiesList=data;
    });
  }

}
