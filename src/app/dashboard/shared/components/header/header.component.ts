import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_interfaces/User.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

UserName:string;
Email:string;

@Output()toggleSideBarForMe:EventEmitter<any>=new EventEmitter();

  constructor(private router: Router) {
    
   }

  ngOnInit(): void {
    this.UserName=sessionStorage.getItem("UserName");
    this.Email=sessionStorage.getItem("Email");
  }
  logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(['/'])
    
  }
toggleSideBar(){
this.toggleSideBarForMe.emit();
}
}
