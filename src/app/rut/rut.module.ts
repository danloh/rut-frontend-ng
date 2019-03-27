import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared';
import { MarkdownPipe, PlurPipe, HostPipe, ShowLessPipe } from '../app.pipe';
import { RutResolver } from './rut-resolver.service';
import { RutListComponent } from './rut-list/rut-list.component';
import { WrapRutListComponent } from './rut-list/wrap-rut-list.component';
import { RutSumComponent } from './rut-sum/rut-sum.component';
import { RutViewComponent } from './rut-view/rut-view.component';
import { RutRoutingModule } from './rut-routing.module';
import { CollectComponent } from './collect/collect.component';
import { NewRutComponent } from './new-rut/new-rut.component';
import { UpdateRutComponent } from './update-rut/update-rut.component';

@NgModule({
  declarations: [
    RutListComponent,
    WrapRutListComponent,
    RutSumComponent, 
    RutViewComponent, 
    CollectComponent,
    MarkdownPipe,
    PlurPipe,
    HostPipe,
    ShowLessPipe,
    NewRutComponent,
    UpdateRutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RutRoutingModule
  ],
  exports: [
    RutListComponent,
    WrapRutListComponent,
    RutSumComponent,
    RutViewComponent
  ],
  providers: [
    RutResolver
  ]
})
export class RutModule { }
