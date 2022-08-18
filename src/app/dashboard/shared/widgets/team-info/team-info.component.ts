import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
import { EmailCheck } from 'src/app/_interfaces/email.model';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {

  Data!: any;
  emailCheck:EmailCheck={email:''};
  showSpinner:boolean=true;
  section:any;
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
    private dataTrans:DataTransfertService,
  ) { }

  ngOnInit(): void {
    this.initDataTable();
    this.section = document.getElementById("section");
    this.section.style.opacity ="0";
  }
  initDataTable() {
    const email=this.dataTrans.getTeamProfile();
    const apiAddress: string = `api/Crm/ProfileByUser`;
    this.emailCheck.email=email;
    console.log("aaaa"+email);
    this.dashService.getProfileByUser(apiAddress,this.emailCheck).subscribe({
      next:(responce)=>{
        this.Data=responce.value[0];
        console.log(this.Data);
        if(this.Data!=null){
          this.showSpinner=false;
          this.section.style.opacity ="1";
        }
      }   
    })
}
}
