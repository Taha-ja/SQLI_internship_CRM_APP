import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen=true;

  //OpportinitiesList:any=[];
  windowWidth:number;
  constructor(
    private service:DashboardService,
    private jwtHelper: JwtHelperService,
    private dashService:DashboardService,) {
    // this.windowWidth=window.innerWidth;
    // console.log(this.windowWidth);

   
  }
  
 

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
  
    return false;
  }
  logOut = () => {
    localStorage.removeItem("jwt");
  }

  ngOnInit(): void {
    
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300)
  this.sideBarOpen=true;
    this.refreshOppList();
    window.addEventListener("resize", (_)=>{
      this.windowWidth=window.innerWidth;
      
    });
    const body = document.body;
    const html = document.documentElement;
    const heightToAdd = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    console.log(heightToAdd)
  }
  sideBarToggler(){
    this.sideBarOpen=!this.sideBarOpen;
  }
  refreshOppList(){

    // this.service.opportunities("").subscribe(data=>{
    //   this.OpportinitiesList=data;
    // });
    const apiAddress: string = 'api/Crm/opportunities';
    this.dashService.opportunities(apiAddress).subscribe({
      next:(responce)=>{
        var result = JSON.parse(JSON.stringify(responce));

        var opportunities=responce.value;
        console.log(result.value[0].emailaddress);
        // this.dataSource = new MatTableDataSource(result.value);

      }
    })

  }


}
