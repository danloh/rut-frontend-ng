import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, PipeModule } from '../shared';
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
    MaterialModule,
    PipeModule,
    RutModule,
    TagRoutingModule
  ],
  providers: [
    TagResolver
  ]
})
export class TagModule {}
