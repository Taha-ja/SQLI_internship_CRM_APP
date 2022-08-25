import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { User } from 'src/app/_interfaces/User.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

UserName:string;
Email:string;
Data!: any;
showSpinner:boolean=true;
section:any;

@Output()toggleSideBarForMe:EventEmitter<any>=new EventEmitter();

  constructor(private router: Router,private dashService:DashboardService) {
    
   }


  ngOnInit(): void {
    this.UserName=localStorage.getItem("UserName");
    this.Email=localStorage.getItem("Email");
    this.initDataTable();
    
  }
  logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(['/'])
    
  }
toggleSideBar(){
this.toggleSideBarForMe.emit();
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
