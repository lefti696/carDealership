import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MaterialModule} from '../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarListComponent } from './car-list/car-list.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CarDetailComponent,
    CarListComponent,
    WelcomeScreenComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
