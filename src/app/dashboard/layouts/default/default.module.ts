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
import{MatIconModule}from '@angular/material/icon';
import { ModifierProfilComponent } from '../../modules/modifier-profil/modifier-profil.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AgGridModule } from 'ag-grid-angular';
import {MatButtonModule} from '@angular/material/button'
@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    ComptesComponent,
    ModifierProfilComponent,
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
    MatIconModule,
    MatFormFieldModule,
    AgGridModule,
    MatButtonModule

    
  ]
})
export class DefaultModule { }
