import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, PipeModule } from '../shared';
import { RutResolver } from './rut-resolver.service';
import { RutListComponent } from './rut-list/rut-list.component';
import { WrapRutListComponent } from './rut-list/wrap-rut-list.component';
import { RutSumComponent } from './rut-sum/rut-sum.component';
import { RutViewComponent } from './rut-view/rut-view.component';
import { RutRoutingModule } from './rut-routing.module';
import { CollectComponent } from './collect/collect.component';
import { NewRutComponent } from './new-rut/new-rut.component';
import { UpdateRutComponent } from './update-rut/update-rut.component';
import { AddItemComponent } from './add-item/add-item.component';

@NgModule({
  declarations: [
    RutListComponent,
    WrapRutListComponent,
    RutSumComponent, 
    RutViewComponent, 
    CollectComponent,
    NewRutComponent,
    UpdateRutComponent,
    AddItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipeModule,
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
