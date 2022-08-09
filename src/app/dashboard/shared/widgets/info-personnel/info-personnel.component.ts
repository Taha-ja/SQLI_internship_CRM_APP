import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-personnel',
  templateUrl: './info-personnel.component.html',
  styleUrls: ['./info-personnel.component.scss']
})
export class InfoPersonnelComponent implements OnInit {
  UserName:string;
  Email:string;
  constructor() { }

  ngOnInit(): void {
    this.UserName=sessionStorage.getItem("UserName");
    this.Email=sessionStorage.getItem("Email");
  }

}
