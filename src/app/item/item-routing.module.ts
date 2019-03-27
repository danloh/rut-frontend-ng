import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemViewComponent } from './item-view/item-view.component';
import { ItemResolver } from './item-resolver.service';
import { NewItemComponent } from './new-item/new-item.component';
import { AuthGuard } from '../core';

const itemRoutes: Routes = [
  {
    path: 'item/:id',
    component: ItemViewComponent,
    resolve: {
      res: ItemResolver
    }
  },
  {
    path: 'submit',
    component: NewItemComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(itemRoutes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {}