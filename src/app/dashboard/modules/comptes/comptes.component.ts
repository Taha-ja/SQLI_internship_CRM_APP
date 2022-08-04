import { Component, OnInit } from '@angular/core';
import{MatIconModule}from '@angular/material/icon';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.scss']
})
export class ComptesComponent implements OnInit {
  UserName:string;
Email:string;

  profilePicture: string = null;
  constructor() { }

  ngOnInit(): void {
    this.UserName=sessionStorage.getItem("UserName");
    this.Email=sessionStorage.getItem("Email");
  }


}
