import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ServiceCardComponent } from './members/service-card/service-card.component';
import { ServiceDetailsComponent } from './members/service-details/service-details.component';
import { ServiceListComponent } from './members/service-list/service-list.component';
import { ServiceMessageComponent } from './members/service-message/service-message.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { AuthComponent } from './auth/auth.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessagesComponent,
    NavComponent,
    SidebarComponent,
    ServiceCardComponent,
    ServiceDetailsComponent,
    ServiceListComponent,
    ServiceMessageComponent,
    PhotoEditorComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
