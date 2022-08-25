import { Component, OnInit} from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, SideBarDef} from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})


export class PostsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'emailaddress', 'totalamount', 'actualclosedate'];
  public rowData$!: Observable<any[]>;
  private gridApi!: GridApi;
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
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // Data that gets displayed in the grid
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        minWidth: 225,
        width: 225,
        maxWidth: 225,
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        minWidth: 180,
        maxWidth: 400,
        width: 250,
      },
    ],
    position: 'left',
    defaultToolPanel: 'filters',
  };

onFilterTextBoxChanged() {
  this.gridApi.setQuickFilter(
    (document.getElementById('filter-text-box') as HTMLInputElement).value
  );
}
  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.initDataTable()
    //this.gridApi.sizeColumnsToFit();

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
    //editable: true,
    flex: 1,
    resizable: true,
    sortable: true,
    filter: true,

    //
    // allow every column to be aggregated
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true,

    // suppressColumnsToolPanel: true,
    // suppressMenu: true,
    menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    columnsMenuParams: {
      // To suppress updating the layout of columns as they are rearranged in the grid 
      suppressSyncLayoutWithGrid: true,
      // To suppress Column Filter section 
      suppressColumnFilter: true,
      // To suppress Select / Un-select all widget 
      suppressColumnSelectAll: true,
      // To suppress Expand / Collapse all widget 
      suppressColumnExpandAll: true,
      // By default, column groups start expanded.
      // Pass true to default to contracted groups 
      contractColumnSelection: true,
    },

    floatingFilter: true,
    floatingFilterComponentParams: { suppressFilterButton: false },
  };
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}





