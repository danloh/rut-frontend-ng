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
import { AppRoutingModule } from './app-routing.module';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
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
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {}
