import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ApiService, AuthService, RutService, ItemService, TagService 
} from './service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    AuthService,
    RutService,
    ItemService, 
    TagService
  ]
})
export class CoreModule {}
