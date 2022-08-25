import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserComponentFactory } from 'ag-grid-community';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
import { User } from 'src/app/_interfaces/User.model';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen=false;
  user:User;
  //OpportinitiesList:any=[];
  windowWidth:number;
  private userSubject: BehaviorSubject<User>;
  public usr: Observable<User>;
  private currentUser:string;
  constructor(
    private service:DashboardService,
    private jwtHelper: JwtHelperService,
    private dashService:DashboardService,
    private http: HttpClient,
    private authService:AuthenticationService,
    ) {
    // this.windowWidth=window.innerWidth;
    // console.log(this.windowWidth);
    // this.user=this.dataService.userValue;

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

  ngOnInit(){
    
    // this.user=this.dataService.userValue;
    // console.log(this.dataService.userValue);
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300)
    setTimeout(()=>{

      this.sideBarOpen=true;
    },1300)
    this.refreshOppList();
    window.addEventListener("resize", (_)=>{
      this.windowWidth=window.innerWidth;
      
    });
    const body = document.body;
    const html = document.documentElement;
    const heightToAdd = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    console.log(heightToAdd)
    // console.log(this.dataService.userValue);
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
