import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//import { MarkdownPipe } from './app.pipe';
import { SharedModule } from './shared';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent } from './misc';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    //MarkdownPipe
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    SharedModule,
    CoreModule,
    HomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
