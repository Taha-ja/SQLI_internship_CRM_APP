import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-widget',
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.scss']
})
export class ImageWidgetComponent implements OnInit {
  UserName:string;
  Email:string;
  constructor() { }

  ngOnInit(): void {
    this.UserName=sessionStorage.getItem("UserName");
    this.Email=sessionStorage.getItem("Email");
  
  }

}
