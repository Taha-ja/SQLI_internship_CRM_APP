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
import { AgGridModule } from 'ag-grid-angular';
import{MatIconModule}from '@angular/material/icon';
import { ModifierProfilComponent } from '../../modules/modifier-profil/modifier-profil.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'

import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';

import { ContactComponent } from '../../modules/contact/contact.component';
import { TeamOpportunitiesComponent } from '../../modules/team-opportunities/team-opportunities.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    ComptesComponent,
    ModifierProfilComponent,
    ContactComponent,
    TeamOpportunitiesComponent,
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
    AgGridModule,
    MatIconModule,
    MatFormFieldModule,
    AgGridModule,
    MatButtonModule,
    FormsModule,
    MatButtonModule,
    MatBadgeModule,
    MatInputModule,
    MatChipsModule,
    NgxSkeletonLoaderModule
  ]
})
export class DefaultModule { }
