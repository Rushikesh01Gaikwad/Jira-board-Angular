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
  ]
})
export class ComponentModule { }
