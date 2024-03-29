import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddprojectComponent } from './component/addproject/addproject.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EditComponent } from './component/edit/edit.component';
import { LoginComponent } from './component/login/login.component';

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
    path:'Editproject/:id',
    component:EditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
