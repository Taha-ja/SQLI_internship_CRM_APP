import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef} from 'ag-grid-community';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})


export class PostsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'emailaddress', 'totalamount', 'actualclosedate'];
  public rowData$!: Observable<any[]>;
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
    this.initDataTable();
  }
//init DataTable
initDataTable() {
    const apiAddress: string = 'api/Crm/opportunities';
    // OpportunityModel
    this.dashService.opportunities(apiAddress).subscribe({
      next:(responce)=>{
        //var result = JSON.parse(JSON.stringify(responce));
        this.rowData$=responce.value;
      }   
    })
}

// Each Column Definition results in one Column.
public columnDefs: ColDef[] = [
  { field: 'name', wrapText: true, filter: 'agTextColumnFilter' },
  // { field: 'emailaddress', wrapText: true, filter: 'agTextColumnFilter' },
  { field: 'totalamount', wrapText: true, filter: 'agTextColumnFilter' },
  { field: 'actualclosedate', wrapText: true, filter: 'agTextColumnFilter' },
  { field: 'estimatedclosedate', wrapText: true, filter: 'agTextColumnFilter' },
  { field: 'actualvalue', wrapText: true, filter: 'agTextColumnFilter' },
  { field: 'closeprobability', wrapText: true, filter: 'agTextColumnFilter' },
  // { field: '_transactioncurrencyid_value', wrapText: true, filter: 'agTextColumnFilter' },
  // { field: 'opportunityid', wrapText: true, filter: 'agTextColumnFilter' }
];

// DefaultColDef sets props common to all Columns
public defaultColDef: ColDef = {
  flex: 1,
  resizable: true,
  sortable: true,
  filter: true,
  suppressColumnsToolPanel: true,
  suppressMenu: true,
  floatingFilter: true,
  floatingFilterComponentParams: { suppressFilterButton: false },
  };
}





