import { Component, OnInit } from '@angular/core';
import { DashboardService } from './shared/services/dashboard.service';
import { DataTransfertService } from './shared/services/data-transfert.service';
import { InitDataService } from './shared/services/init-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'CustemerApp';
  constructor(


  ){
    // this.lang=localStorage.getItem("keyLanguage");
    // if(this.lang==="ar"){document.querySelector('input').style.textAlign="end";}
    if(localStorage.getItem("jwt") != null) {

      // this.dataService.getPicture();
      // console.log("this.dataService.getPicture(): ",this.dataService.getImageUrl());
      
      // this.dataService.getUserPicture;
    }
  }
  ngOnInit(): void {
    
  }

}
