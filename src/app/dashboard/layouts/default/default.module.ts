import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/dashboard/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/dashboard/modules/posts/posts.component';
import{SharedModule} from 'src/app/dashboard/shared/shared.module';
import{MatSidenavModule} from'@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import{MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComptesComponent } from 'src/app/dashboard/modules/comptes/comptes.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ComponentTableComponent } from '../../component-table/component-table.component';
import { MatPaginator } from '@angular/material/paginator';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    HttpClientModule ,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class DefaultModule { }