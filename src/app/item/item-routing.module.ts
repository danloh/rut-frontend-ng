import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemViewComponent } from './item-view/item-view.component';
import { ItemResolver } from './item-resolver.service';

const itemRoutes: Routes = [
  {
    path: 'item/:id',
    component: ItemViewComponent,
    resolve: {
      res: ItemResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(itemRoutes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {}
