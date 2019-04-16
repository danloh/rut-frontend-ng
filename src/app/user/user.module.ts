import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from '../shared';
import { RutModule } from '../rut/rut.module';
import { ItemModule } from '../item/item.module';
import { UserRoutingModule } from './user-routing.module';
import { UserResolver } from './user-resolver.service';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    AvatarModule,
    RutModule,
    ItemModule,
    UserRoutingModule
  ],
  providers: [
    UserResolver
  ]
})
export class UserModule {}
