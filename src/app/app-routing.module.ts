import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './misc';

const routes: Routes = [
  {
    path: '404',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    { 
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      //enableTracing: true, 
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
