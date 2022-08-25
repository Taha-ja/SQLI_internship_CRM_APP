import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Route, Router } from '@angular/router';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  Data:any[];
  result:any[]=[];
  userEmail=localStorage.getItem("Email");
  notFound:boolean=false;
  section:any;
  constructor(
              private dashService:DashboardService,
              private dataTrans:DataTransfertService,
              private route:Router) { }
  ngOnInit(): void {

    this.initDataTable();

  }
  
showDetail(email:string){
  this.dataTrans.setTeamProfile(email);
  this.route.navigate(['dashboard/Details'])
  }
  initDataTable() {    
    const apiAddress: string = 'api/Crm/teamContacts';
    this.dashService.opportunities(apiAddress).subscribe({
      next:(responce)=>{
        this.Data=responce.value;
        this.Data.forEach(c => {
          if(c.emailaddress1!=this.userEmail){
            this.result.push(c);
            this.notFound=true
          }
        });
      }
      ,error:()=>{
        setTimeout(_ =>{
          var div = document.getElementById('spinner');
          div.innerHTML += 'Something is wrong,Please check your network';
          this.notFound=true;
        },5000);
      }   
    })
}

}
