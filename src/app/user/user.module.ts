import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutModule } from '../rut/rut.module';
import { ItemModule } from '../item/item.module';
import { UserRoutingModule } from './user-routing.module';
import { UserResolver } from './user-resolver.service';
import { ProfileComponent } from './profile/profile.component';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  declarations: [
    ProfileComponent,
    AvatarComponent
  ],
  imports: [
    CommonModule,
    RutModule,
    ItemModule,
    UserRoutingModule
  ],
  providers: [
    UserResolver
  ]
})
export class UserModule {}
