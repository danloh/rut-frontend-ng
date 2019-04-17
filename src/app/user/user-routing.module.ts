import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { WrapRutListComponent } from '../rut/rut-list/wrap-rut-list.component';
import { WrapItemListComponent } from '../item/item-list/wrap-item-list.component';
import { UpdateUserComponent } from './update-user/update-user.component';
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
      },
      {
        path: 'doings',
        component: WrapItemListComponent,
        data: {per: 'user', flag: 'doing'}
      },
      {
        path: 'todos',
        component: WrapItemListComponent,
        data: {per: 'user', flag: 'todo'}
      },
      {
        path: 'dones',
        component: WrapItemListComponent,
        data: {per: 'user', flag: 'done'}
      }
    ]
  },
  {
    path: 'updateuser/:id',   // as uname, general 
    component: UpdateUserComponent,
    resolve: {
      res: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
