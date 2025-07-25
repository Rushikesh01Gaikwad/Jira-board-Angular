import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { GraphComponent } from './component/graph/graph.component';
import { StatusComponent } from './component/status/status.component';
import { AddprojectComponent } from './component/addproject/addproject.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "dashboard",
    component: GraphComponent,
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
  },
  {
    path: "status",
    component: StatusComponent,
  },
  {
    path: "add",
    component: AddprojectComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
