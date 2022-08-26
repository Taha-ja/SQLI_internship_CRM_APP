import { Component, OnInit} from '@angular/core';
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
  notFound:boolean=false;
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
    this.section = document.getElementById("section");
    //this.section.style.opacity ="0";
    this.section.style.display= "none";
    this.initDataTable();
  }
  initDataTable() {
    const apiAddress: string = 'api/Crm/profileDetails';
    this.dashService.opportunities(apiAddress).subscribe({
      next:(responce)=>{
        this.Data=responce.value[0];
        console.log(this.Data);
        setTimeout(_ =>{
          this.notFound=true;
        },5000);
        if(this.Data!=null || this.notFound==true){
          this.showSpinner=false;
          // this.section.style.opacity ="1";
          this.section.style.display= "block";
        }
      },
      error:()=>{
        setTimeout(_ =>{
          var div = document.getElementById('spinner');
          div.innerHTML += 'Something is wrong,Please check your network';
          this.notFound=true;
          this.showSpinner=false;
          const sec=this.section;
        },5000);
      }   
    })
}

}
