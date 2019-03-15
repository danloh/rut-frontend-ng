import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutRoutingModule } from './rut-routing.module';
import { RutListComponent } from './rut-list/rut-list.component';
import { RutSumComponent } from './rut-sum/rut-sum.component';

@NgModule({
  declarations: [
    RutListComponent, 
    RutSumComponent
  ],
  imports: [
    CommonModule,
    RutRoutingModule
  ],
  exports: [
    RutListComponent, 
    RutSumComponent
  ],
})
export class RutModule { }
