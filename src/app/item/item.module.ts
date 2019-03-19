import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemResolver } from './item-resolver.service';
import { ItemRoutingModule } from './item-routing.module';
import { ItemViewComponent } from './item-view/item-view.component';
import { ItemSumComponent } from './item-sum/item-sum.component';
import { RutModule } from '../rut/rut.module';

@NgModule({
  declarations: [
    ItemViewComponent, 
    ItemSumComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    RutModule
  ],
  providers: [
    ItemResolver
  ]
})
export class ItemModule { }
