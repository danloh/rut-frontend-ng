import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared';
import { ItemResolver } from './item-resolver.service';
import { ItemRoutingModule } from './item-routing.module';
import { ItemViewComponent } from './item-view/item-view.component';
import { ItemSumComponent } from './item-sum/item-sum.component';
import { RutModule } from '../rut/rut.module';
import { ItemListComponent } from './item-list/item-list.component';
import { WrapItemListComponent } from './item-list/wrap-item-list.component';
import { ItemMinComponent } from './item-min/item-min.component';
import { NewItemComponent } from './new-item/new-item.component';

@NgModule({
  declarations: [
    ItemViewComponent, 
    ItemSumComponent, 
    ItemListComponent, 
    ItemMinComponent,
    WrapItemListComponent,
    NewItemComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    MaterialModule,
    RutModule
  ],
  providers: [
    ItemResolver
  ]
})
export class ItemModule { }