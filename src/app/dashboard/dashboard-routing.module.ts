import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { ComptesComponent } from './modules/comptes/comptes.component';
import { ContactComponent } from './modules/contact/contact.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ModifierProfilComponent } from './modules/modifier-profil/modifier-profil.component';

import { PostsComponent } from './modules/posts/posts.component';

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
}
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
