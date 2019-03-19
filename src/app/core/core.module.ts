import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ApiService, RutService, ItemService, TagService 
} from './service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    RutService,
    ItemService, 
    TagService
  ]
})
export class CoreModule { }
