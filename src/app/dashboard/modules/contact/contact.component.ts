import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private service:DashboardService) { }
  ContactsList:any=[];
  ngOnInit(): void {
  }
  refreshOppList(){
    this.service.opportunities("").subscribe(data=>{
      this.ContactsList=data;
    });
  }

}
