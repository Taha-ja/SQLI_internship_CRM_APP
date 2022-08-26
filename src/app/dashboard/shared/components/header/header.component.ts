import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
import { User } from 'src/app/_interfaces/User.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

UserName:string;
Email:string;
user:User;
@Output()toggleSideBarForMe:EventEmitter<any>=new EventEmitter();

  constructor(
              private router: Router,
              private dataService:DataTransfertService)
              {
              }
              
ngOnInit(): void {
                // this.UserName=this.user.firstname+" "+this.user.lastname;
                // this.Email=this.user.email;
    setTimeout(()=>{
      this.user=this.dataService.userValue;

    },1000)
  }
  logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(['/'])
    
  }
toggleSideBar(){
this.toggleSideBarForMe.emit();
}
}