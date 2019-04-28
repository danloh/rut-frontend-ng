import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule, MaterialModule } from '../shared';
import { RutModule } from '../rut/rut.module';
import { ItemModule } from '../item/item.module';
import { UserRoutingModule } from './user-routing.module';
import { UserResolver } from './user-resolver.service';
import { ProfileComponent } from './profile/profile.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UpdateUserComponent,
  ],
  imports: [
    CommonModule,
    AvatarModule,
    MaterialModule,
    ItemModule,
    RutModule,
    
    UserRoutingModule
  ],
  providers: [
    UserResolver
  ]
})
export class UserModule {}
