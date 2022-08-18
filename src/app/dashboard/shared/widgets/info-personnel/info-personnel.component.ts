import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-info-personnel',
  templateUrl: './info-personnel.component.html',
  styleUrls: ['./info-personnel.component.scss']
})
export class InfoPersonnelComponent implements OnInit {
  Data!: any;
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
    private dashService:DashboardService
  ) { }

  ngOnInit(): void {
    this.initDataTable();
    this.section = document.getElementById("section");
    this.section.style.opacity ="0";
  }
  initDataTable() {
    const apiAddress: string = 'api/Crm/profileDetails';
    this.dashService.opportunities(apiAddress).subscribe({
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
