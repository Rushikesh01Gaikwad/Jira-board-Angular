import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRoutingModule } from './component-routing.module';
import { FormsModule } from '@angular/forms';
import { GraphComponent } from './graph/graph.component';
import { StatusComponent } from './status/status.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    GraphComponent,
    StatusComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    FormsModule,
    MatPaginatorModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    ChartModule,
  ]
})
export class ComponentModule { }
