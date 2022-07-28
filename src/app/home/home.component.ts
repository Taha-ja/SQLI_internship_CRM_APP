import { Component, ElementRef, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cont :boolean;
  //constructor(private jwtHelper: JwtHelperService) { }
  constructor(private el: ElementRef){}
  ngOnInit(): void {
    console.log("A "+this.cont)
  }
  
  // isUserAuthenticated = (): boolean => {
  //   const token = localStorage.getItem("jwt");
  
  //   if (token && !this.jwtHelper.isTokenExpired(token)){
  //     return true;
  //   }
  
  //   return false;
  // }
  
  logOut = () => {
    localStorage.removeItem("jwt");
  }
appendClass(){
  // this.el.nativeElement.classList.add("right-panel-active");
  this.cont=true;
  // console.log(this.cont)
}
  // signUpButton(){
  //     this.container.classList.add("right-panel-active");
  // }
}
