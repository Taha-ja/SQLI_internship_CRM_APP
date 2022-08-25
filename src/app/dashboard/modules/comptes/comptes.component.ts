import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/shared/services/dashboard.service';


@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.scss'],
 
})
export class ComptesComponent implements OnInit {
  //


  //variable Username & email
  UserName:string;
  Email:string;
  Data!: any;
  //  Responsive variable
  mobileMedia:any=window.matchMedia("(max-width:520px)")
  familyStatus={
    1:"Single",
    2:"Married",
    3:"Divorced",
    4:"Widowed"
  }
  constructor(
              private responsive: BreakpointObserver,
              private dashService:DashboardService) { 
    if(this.mobileMedia.matches){
    //alert("Media Matches");
    this.UserName;
    
  }
  }


  ngOnInit(){


  }


}