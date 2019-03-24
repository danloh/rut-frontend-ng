import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { UserResolver } from './user-resolver.service';

const routes: Routes = [
  {
    path: 'p/:uname',
    component: ProfileComponent,
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
