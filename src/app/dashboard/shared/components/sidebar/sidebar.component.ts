import { Component, OnInit } from '@angular/core';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
import { User } from 'src/app/_interfaces/User.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sideBarOpen=true;
  user:User;
  constructor(private dataService:DataTransfertService) { 
  }
  
  ngOnInit(): void {
    // this.user=this.dataService.userValue;
    setTimeout(()=>{
      this.user=this.dataService.userValue;
    },1000)
  }

}
