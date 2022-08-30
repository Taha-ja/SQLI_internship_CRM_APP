import { Component, OnInit } from '@angular/core';
import { DataTransfertService } from 'src/app/shared/services/data-transfert.service';
import { InitDataService } from 'src/app/shared/services/init-data.service';
import { User } from 'src/app/_interfaces/User.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sideBarOpen=true;
  user:User;
  constructor(private initData:InitDataService) { 
  }
  
  ngOnInit(): void {
    this.user = this.initData.getUser();
  }

}
