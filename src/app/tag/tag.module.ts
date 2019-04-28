import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, PipeModule } from '../shared';
import { TagRoutingModule } from './tag-routing.module';
import { TagViewComponent } from './tag-view/tag-view.component';
import { TagResolver } from './tag-resolver.service';
import { RutListModule, ItemListModule } from '../shared';

@NgModule({
  declarations: [
    TagViewComponent
  ],
  imports: [
    CommonModule,
    TagRoutingModule,
    MaterialModule,
    PipeModule,
    RutListModule,
  ],
  providers: [
    TagResolver
  ]
})
export class TagModule {}
