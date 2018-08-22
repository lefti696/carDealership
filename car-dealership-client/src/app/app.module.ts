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
import {FormsModule} from '@angular/forms';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {StorageServiceModule} from 'angular-webstorage-service';
import {FavoriteCarListComponent} from './favorite-car-list/favorite-car-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CarDetailComponent,
    CarListComponent,
    WelcomeScreenComponent,
    SellerCarDetailComponent,
    SellerCarListComponent,
    LoginDialogComponent,
    FavoriteCarListComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StorageServiceModule
  ],
  entryComponents: [LoginDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
