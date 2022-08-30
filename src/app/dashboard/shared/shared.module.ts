import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatDividerModule} from '@angular/material/divider';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatIconModule}from '@angular/material/icon';
import{MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AreaComponent } from './widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from './widgets/card/card.component';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ComptesComponent } from '../modules/comptes/comptes.component';
import { ImageWidgetComponent } from './widgets/image-widget/image-widget.component';
import { TeamInfoComponent } from './widgets/team-info/team-info.component';
import { EntrepriseComponent } from './widgets/entreprise/entreprise.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,  
    AreaComponent, 
    CardComponent,
    ImageWidgetComponent,
    TeamInfoComponent,
    EntrepriseComponent

  ],
  
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatTableModule,
    MatFormFieldModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    ImageWidgetComponent,
    EntrepriseComponent
  ]

})


export class SharedModule {
  
}
