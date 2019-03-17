import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'r',
    loadChildren: './rut/rut.module#RutModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    { preloadingStrategy: PreloadAllModules }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
