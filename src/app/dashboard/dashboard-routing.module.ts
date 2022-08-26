import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { ComptesComponent } from './modules/comptes/comptes.component';
import { ContactComponent } from './modules/contact/contact.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ModifierProfilComponent } from './modules/modifier-profil/modifier-profil.component';

import { PostsComponent } from './modules/posts/posts.component';
import { TeamOpportunitiesComponent } from './modules/team-opportunities/team-opportunities.component';
import { ImageWidgetComponent } from './shared/widgets/image-widget/image-widget.component';
import { TeamInfoComponent } from './shared/widgets/team-info/team-info.component';

const routes: Routes = [{
  path:'',
  component:DefaultComponent,
  children:[{
    path:'',
    component:DashboardComponent
  },{
    path:'posts',
    component:PostsComponent,
  },
  {
    path:'contact',
    component:ContactComponent,
  },
  {
    path:'comptes',
    component:ComptesComponent,
  },
{
  path:'ModifierProfile',
    component:ModifierProfilComponent,
},
{
  path:'Details',
    component:TeamInfoComponent,
},{
  path:'teamOpp',
  component:TeamOpportunitiesComponent,
},
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
