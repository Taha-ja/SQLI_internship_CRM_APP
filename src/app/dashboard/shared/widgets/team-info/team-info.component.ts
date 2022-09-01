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
  notFound:boolean=false;
  isMore:boolean=false;
  container:any;
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
    private dataTrans:DataTransfertService,
  ) {
    
  }
  myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
    if(moreText.style.display === "none"){
      moreText.style.display="initial";
      // btnText.innerHTML = "keyboard_arrow_down"; 
      this.isMore=true;
    }
    else{
      moreText.style.display="none";
      // btnText.innerHTML = "keyboard_arrow_up";
      this.isMore=false;
    }
    // if (dots.style.display === "none") {
    //   dots.style.display = "inline";
    //   btnText.innerHTML = "Read more"; 
    //   moreText.style.display = "none";
    // } else {
    //   dots.style.display = "none";
    //   btnText.innerHTML = "Read less"; 
    //   moreText.style.display = "inline";
    // }
  }
  ngOnInit(): void {
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300)
    this.initDataTable();
    // this.container = document.getElementById("btnContainer");
    // setInterval(Move,200)
    // function Move(){
    //   if(this.Data!=null){
    //   this.container.style.marginTop="-50px";
    // }
    // }
  }
  initDataTable() {
    const email=this.dataTrans.getTeamProfile();
    const apiAddress: string = `api/Crm/contactDetails`;
    this.emailCheck.email=email;
    this.dashService.getProfileByUser(apiAddress,this.emailCheck).subscribe({
      next:(responce)=>{
        this.Data=responce.value[0];
        if(this.Data.entityimage!=null){
          this.UrlImage="data:image/png;base64,"+this.Data.entityimage;
        }
        else{
          this.UrlImage="../../../../../assets/images/unkown.jfif";
        }
        this.notFound=true;
      }   
    })
}

}
