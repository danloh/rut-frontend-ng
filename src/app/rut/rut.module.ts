import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MatButtonModule } from '@angular/material';
import { MarkdownPipe, PlurPipe, HostPipe, ShowLessPipe } from '../app.pipe';
import { RutResolver } from './rut-resolver.service';
import { RutListComponent } from './rut-list/rut-list.component';
import { WrapRutListComponent } from './rut-list/wrap-rut-list.component';
import { RutSumComponent } from './rut-sum/rut-sum.component';
import { RutViewComponent } from './rut-view/rut-view.component';
import { RutRoutingModule } from './rut-routing.module';
import { CollectComponent } from './collect/collect.component';

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
    ShowLessPipe
  ],
  imports: [
    CommonModule,
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
