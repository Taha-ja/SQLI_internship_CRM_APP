import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})


export class PostsComponent implements OnInit {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedColumns: string[] = ['name', 'emailaddress', 'totalamount', 'actualclosedate'
  /*'estimatedclosedate','actualvalue','closeprobability','_transactioncurrencyid_value','opportunityid'*/];
  
  dataSource:any;
  
  constructor(
    private dashService:DashboardService,
  ) { 
  }

  ngOnInit(): void {
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
       );
    },300)
    const apiAddress: string = 'api/Crm/opportunities';
    // OpportunityModel
    this.dashService.opportunities(apiAddress).subscribe({
      next:(responce)=>{
        var result = JSON.parse(JSON.stringify(responce));

        //var opportunities=responce.value;
        console.log(result.value[0].emailaddress);
        this.dataSource = new MatTableDataSource(result.value);

      }
    })
  }

  applyFilter(filterValue: string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
  } 

}
