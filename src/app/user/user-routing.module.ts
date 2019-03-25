import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { WrapRutListComponent } from '../rut/rut-list/wrap-rut-list.component';
import { UserResolver } from './user-resolver.service';

const routes: Routes = [
  {
    path: 'p/:id',   // as uname, general 
    component: ProfileComponent,
    resolve: {
      res: UserResolver
    },
    children: [
      {
        path: 'create',
        component: WrapRutListComponent,
        data: {per: 'user', action: 'create'}
      },
      {
        path: 'star',
        component: WrapRutListComponent,
        data: {per: 'user', action: 'star'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
