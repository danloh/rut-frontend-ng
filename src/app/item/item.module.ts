import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared';
import { ItemResolver } from './item-resolver.service';
import { ItemRoutingModule } from './item-routing.module';
import { ItemViewComponent } from './item-view/item-view.component';
import { ItemSumComponent, AddToListDialog } from './item-sum/item-sum.component';
import { RutModule } from '../rut/rut.module';
import { ItemListComponent } from './item-list/item-list.component';
import { WrapItemListComponent } from './item-list/wrap-item-list.component';
import { ItemMinComponent } from './item-min/item-min.component';
import { NewItemComponent } from './new-item/new-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';

@NgModule({
  declarations: [
    ItemViewComponent, 
    ItemSumComponent,
    AddToListDialog,
    ItemListComponent, 
    ItemMinComponent,
    WrapItemListComponent,
    NewItemComponent,
    UpdateItemComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    MaterialModule,
    RutModule
  ],
  entryComponents: [
    AddToListDialog
  ],
  providers: [
    ItemResolver
  ]
})
export class ItemModule { }
