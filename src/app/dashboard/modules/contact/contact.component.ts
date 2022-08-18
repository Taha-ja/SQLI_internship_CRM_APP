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
  showSpinner:boolean=true;
  constructor(
              private dashService:DashboardService,
              private dataTrans:DataTransfertService,
              private route:Router) { }
  //ContactsList:any=[];
  ngOnInit(): void {
    // setTimeout(()=>{
    //   window.dispatchEvent(
    //     new Event('resize')
    //   );
    // },300);
    this.initDataTable();
  }
  
  // refreshOppList(){
  //   this.dashService.opportunities("").subscribe(data=>{
  //     this.Data=data;
  //   });
  // }
showDetail(email:string){
  this.dataTrans.setTeamProfile(email);
  this.route.navigate(['Details'])
  }
  initDataTable() {    
    const apiAddress: string = 'api/Crm/TeamprofileDetails';
    this.dashService.opportunities(apiAddress).subscribe({
      next:(responce)=>{
        this.Data=responce.value;
        this.Data.forEach(c => {
          if(c.emailaddress1!=this.userEmail){
            this.result.push(c);
          }
        });
        console.log(this.Data);
        if(this.result!=null){
          this.showSpinner=false;
        }
      }   
    })
}

}
