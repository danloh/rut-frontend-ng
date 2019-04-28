import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserResolver } from './user-resolver.service';
import { ProfileComponent } from './profile/profile.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { 
  AvatarModule, MaterialModule, RutListModule, ItemListModule 
} from '../shared';

@NgModule({
  declarations: [
    ProfileComponent,
    UpdateUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AvatarModule,
    MaterialModule,
    ItemListModule,
    RutListModule,
  ],
  providers: [
    UserResolver
  ]
})
export class UserModule {}
