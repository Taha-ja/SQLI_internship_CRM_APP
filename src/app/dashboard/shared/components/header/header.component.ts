import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

@Output()toggleSideBarForMe:EventEmitter<any>=new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(['/'])
    
  }
toggleSideBar(){
this.toggleSideBarForMe.emit();
}
}
