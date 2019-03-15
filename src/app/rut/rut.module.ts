import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutRoutingModule } from './rut-routing.module';
import { RutListComponent } from './rut-list/rut-list.component';
import { RutSumComponent } from './rut-sum/rut-sum.component';
import { RutViewComponent } from './rut-view/rut-view.component';

@NgModule({
  declarations: [
    RutListComponent, 
    RutSumComponent, 
    RutViewComponent
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
