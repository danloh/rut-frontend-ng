import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { RegComponent } from './reg.component';
import { SigninComponent } from './signin.component';

@NgModule({
  declarations: [
    RegComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
