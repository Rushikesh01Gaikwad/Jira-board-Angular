import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRoutingModule } from './component-routing.module';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    FormsModule
  ]
})
export class ComponentModule { }
