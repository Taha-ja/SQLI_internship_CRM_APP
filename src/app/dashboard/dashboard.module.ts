import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DefaultModule } from './layouts/default/default.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AgGridModule } from 'ag-grid-angular';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import 'ag-grid-enterprise';
import { ContactComponent } from './modules/contact/contact.component';
import { TeamOpportunitiesComponent } from './modules/team-opportunities/team-opportunities.component';
// import { ModuleRegistry } from '@ag-grid-community/core';     // @ag-grid-community/core will always be implicitly available
// import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// import { CsvExportModule } from "@ag-grid-community/csv-export";
// import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
// import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";

// import { LicenseManager } from 'ag-grid-enterprise';
// LicenseManager.setLicenseKey("For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-15_October_2022_[v2]_MTY2NTc4ODQwMDAwMA==ed34c56281207035daa5a30ff4d54660")
// ModuleRegistry.registerModules([
//   ClientSideRowModelModule,
//   CsvExportModule,
//   ExcelExportModule,
//   MasterDetailModule
// ]);

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DefaultModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    AgGridModule,

  ]
})
export class DashboardModule { }
