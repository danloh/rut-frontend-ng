import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent, NotFoundComponent, AboutComponent } from './misc';
import { MaterialModule } from './shared';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
//import { UserModule } from './user/user.module';
//import { ItemModule } from './item/item.module';
//import { RutModule } from './rut/rut.module';
//import { TagModule } from './tag/tag.module';
import { AppRoutingModule } from './app-routing.module';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    SharedModule,
    MaterialModule,
    CoreModule,
    HomeModule,
    AuthModule,
    //UserModule,
    //ItemModule,
    //RutModule,
    //TagModule,
    AppRoutingModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {}
