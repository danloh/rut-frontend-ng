import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutViewComponent } from './rut-view/rut-view.component';
import { NewRutComponent } from './new-rut/new-rut.component';
import { RutResolver } from './rut-resolver.service';
import { AuthGuard } from '../core';

const rutRoutes: Routes = [
  {
    path: 'r/:id',
    component: RutViewComponent,
    resolve: {
      res: RutResolver
    }
  },
  {
    path: 'new',
    component: NewRutComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rutRoutes)],
  exports: [RouterModule]
})
export class RutRoutingModule { }
