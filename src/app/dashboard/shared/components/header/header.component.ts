import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
import { User } from 'src/app/_interfaces/User.model';
import { delay } from 'rxjs/operators';
import { InitDataService } from 'src/app/shared/services/init-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

UserName:string;
Email:string;
// user:User={firstname:"firstname",lastname:"lastname",email:"email"};
user:User;
UrlImage:any;
fullName:any;
@Output()toggleSideBarForMe:EventEmitter<any>=new EventEmitter();

  constructor(
              private router: Router,
              public dataService:DataTransfertService,
              private initData:InitDataService)
              {
              } 
ngOnInit(): void {
  
  this.user = this.initData.getUser();
  this.fullName=this.user.firstname+" "+this.user.lastname;
  if(this.user.entityimage!=null){
  // this.user.entityimage="data:image/png;base64,"+this.user.entityimage;
  this.UrlImage="data:image/png;base64,"+this.user.entityimage;

  }else{
    // this.user.entityimage="../../../../../assets/images/unkown.jfif";
    this.UrlImage="../../../../../assets/images/unkown.jfif";

  }
  this.dataService.profileImageUpdate$.subscribe((profileImage) => 
  {
    this.UrlImage = profileImage;
  }
  );
  this.dataService.fullNameUpdate$.subscribe((fullNameUpdate) => 
  {
    this.fullName=fullNameUpdate; 
  });
  }
  logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(['/Authentification'])
    
  }
toggleSideBar(){
this.toggleSideBarForMe.emit();
}
}