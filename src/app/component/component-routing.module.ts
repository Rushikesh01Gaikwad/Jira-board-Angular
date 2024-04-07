import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddprojectComponent } from './addproject/addproject.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphComponent } from './graph/graph.component';
import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
  },
  {
    path:'Dashboard',
    component:DashboardComponent,
  },
  {
    path:'Addproject',
    component:AddprojectComponent,
  },
  {
    path: "Graph",
    component:GraphComponent,
  },
  {
    path: "status",
    component:StatusComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
