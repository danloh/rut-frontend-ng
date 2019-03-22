import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//import { MarkdownPipe } from './app.pipe';
import { SharedModule } from './shared';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent } from './misc';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { TagModule } from './tag/tag.module';
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
    AuthModule,
    ItemModule,
    TagModule,
    AppRoutingModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {}
