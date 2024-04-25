import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { GraphComponent } from './component/graph/graph.component';
import { LoginComponent } from './component/login/login.component';
import { StatusComponent } from './component/status/status.component';

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
    path: "Graph",
    component:GraphComponent,
  },
  {
    path: "status",
    component:StatusComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
