import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared';
import { CoreModule } from './core/core.module';
import { RutModule } from './rut/rut.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CoreModule,
    RutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
