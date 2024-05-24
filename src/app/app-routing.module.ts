import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { GraphComponent } from './component/graph/graph.component';
import { StatusComponent } from './component/status/status.component';
import { AddprojectComponent } from './component/addproject/addproject.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
  },
  {
    path: "Graph",
    component:GraphComponent,
  },
  {
    path: "status",
    component:StatusComponent,
  },
  {
    path: "add",
    component:AddprojectComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
