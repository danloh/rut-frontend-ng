import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core';
import { NotFoundComponent, AboutComponent } from './misc';

const routes: Routes = [
  {
    path: '',  // home
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'auth', 
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'p',  // user
    loadChildren: './user/user.module#UserModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'item',
    loadChildren: './item/item.module#ItemModule'
  },
  {
    path: 'r',  // rut
    loadChildren: './rut/rut.module#RutModule'
  },
  {
    path: 'tag',
    loadChildren: './tag/tag.module#TagModule'
  },
  {
    path: 'about',
    component: AboutComponent,
  },
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
