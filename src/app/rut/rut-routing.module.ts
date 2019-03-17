import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutViewComponent } from './rut-view/rut-view.component';
import { RutResolver } from './rut-resolver.service';

const rutRoutes: Routes = [
  {
    path: ':id',
    component: RutViewComponent,
    resolve: {
      res: RutResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(rutRoutes)],
  exports: [RouterModule]
})
export class RutRoutingModule { }
