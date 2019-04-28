import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagViewComponent } from './tag-view/tag-view.component';
import { TagResolver } from './tag-resolver.service';

const tagRoutes: Routes = [
  {
    path: ':tname',  // '/tag/'
    component: TagViewComponent,
    resolve: {
      res: TagResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(tagRoutes)],
  exports: [RouterModule]
})
export class TagRoutingModule {}
