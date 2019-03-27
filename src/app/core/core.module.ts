import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { 
  ApiService, AuthService, AuthGuard, RutService, ItemService, 
  TagService, UserService 
} from './service';
import { HttpIntercept } from './interceptor/http.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true },
    ApiService,
    AuthService,
    AuthGuard,
    UserService,
    RutService,
    ItemService,
    TagService
  ]
})
export class CoreModule {}
