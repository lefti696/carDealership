import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MaterialModule} from '../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarDetailComponent} from './car-detail/car-detail.component';
import {CarListComponent} from './car-list/car-list.component';
import {AppRoutingModule} from './app-routing.module';
import {WelcomeScreenComponent} from './welcome-screen/welcome-screen.component';
import {HttpClientModule} from '@angular/common/http';
import {SellerCarDetailComponent} from './seller-car-detail/seller-car-detail.component';
import {SellerCarListComponent} from './seller-car-list/seller-car-list.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CarDetailComponent,
    CarListComponent,
    WelcomeScreenComponent,
    SellerCarDetailComponent,
    SellerCarListComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
