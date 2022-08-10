
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';


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

  //  Responsive variable
mobileMedia:any=window.matchMedia("(max-width:520px)")
 
  constructor(private responsive: BreakpointObserver) { 
    if(this.mobileMedia.matches){
    //alert("Media Matches");
    this.UserName;
    
  }

  }

  ngOnInit(): void {
    this.UserName=sessionStorage.getItem("UserName");
    this.Email=sessionStorage.getItem("Email");
  
    
  }

}
