import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MatButtonModule } from '@angular/material';

import { RutResolver } from './rut-resolver.service';
import { RutListComponent } from './rut-list/rut-list.component';
import { RutSumComponent } from './rut-sum/rut-sum.component';
import { RutViewComponent } from './rut-view/rut-view.component';
import { RutRoutingModule } from './rut-routing.module';

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
    RutSumComponent,
    RutViewComponent
  ],
  providers: [
    RutResolver
  ]
})
export class RutModule { }
