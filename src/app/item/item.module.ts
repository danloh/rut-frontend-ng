import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemResolver } from './item-resolver.service';
import { ItemRoutingModule } from './item-routing.module';
import { ItemViewComponent } from './item-view/item-view.component';
import { ItemSumComponent, AddToListDialog, FlagItemDialog } from './item-sum/item-sum.component';
import { NewItemComponent } from './new-item/new-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { 
  MaterialModule, ItemListModule, RutListModule, PipeModule, AvatarModule 
} from '../shared';

@NgModule({
  declarations: [
    ItemViewComponent, 
    ItemSumComponent,
    AddToListDialog,
    FlagItemDialog,
    NewItemComponent,
    UpdateItemComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    MaterialModule,
    ItemListModule,
    RutListModule,
    PipeModule,
    AvatarModule,
  ],
  entryComponents: [
    AddToListDialog,
    FlagItemDialog
  ],
  providers: [
    ItemResolver
  ]
})
export class ItemModule {}
