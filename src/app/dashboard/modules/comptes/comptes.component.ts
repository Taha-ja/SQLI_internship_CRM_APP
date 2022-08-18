
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardService } from 'src/app/shared/services/dashboard.service';


@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.scss'],
 
})
export class ComptesComponent implements OnInit {
 // ProfileForm=new FormControl({

  //});

  //variable Username & email
  UserName:string;
  Email:string;

  //  Responsive variable
mobileMedia:any=window.matchMedia("(max-width:520px)")
 
  constructor(private responsive: BreakpointObserver) { 
   // private toast:DashboardService
  }
 
  ngOnInit(): void {
    this.UserName=sessionStorage.getItem("UserName");
    this.Email=sessionStorage.getItem("Email");
  
    
  }

}
