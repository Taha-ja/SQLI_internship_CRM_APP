import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/shared/services/dashboard.service';


@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.scss'],
})
export class ComptesComponent implements OnInit {
  Data!: any;
  notFound:boolean=false;
  UrlImage:any;
  //  Responsive variable
  mobileMedia:any=window.matchMedia("(max-width:520px)")
  familyStatus={
    1:"Single",
    2:"Married",
    3:"Divorced",
    4:"Widowed"
  }
  constructor(
    private dashService:DashboardService,
  ) { 
  }

  ngOnInit(){
    this.initDataTable();
  }

  initDataTable() {
    const apiAddress: string = 'api/Crm/profileDetails';
    this.dashService.opportunities(apiAddress).subscribe({
      next:(responce)=>{
        this.Data=responce.value[0];

        if(this.Data.entityimage!=null){
          this.UrlImage="data:image/png;base64,"+this.Data.entityimage;
        }
        else{
          this.UrlImage="../../../../../assets/images/unkown.jfif";
        }
      },
      error:()=>{
        setTimeout(_ =>{
          var div = document.getElementById('spinner');
          div.innerHTML += 'Something is wrong,Please check your network';
          this.notFound=true;
        },5000);
      }   
    })
  }


}