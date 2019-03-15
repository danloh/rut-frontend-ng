import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, RutService } from './service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    RutService,
  ]
})
export class CoreModule { }
