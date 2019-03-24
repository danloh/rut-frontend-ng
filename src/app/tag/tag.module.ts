import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagRoutingModule } from './tag-routing.module';
import { TagViewComponent } from './tag-view/tag-view.component';
import { TagResolver } from './tag-resolver.service';
import { RutModule } from '../rut/rut.module';

@NgModule({
  declarations: [
    TagViewComponent
  ],
  imports: [
    CommonModule,
    RutModule,
    TagRoutingModule
  ],
  providers: [
    TagResolver
  ]
})
export class TagModule {}
