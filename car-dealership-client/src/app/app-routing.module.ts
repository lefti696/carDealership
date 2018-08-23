import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarListComponent} from './car-list/car-list.component';
import {WelcomeScreenComponent} from './welcome-screen/welcome-screen.component';
import {CarDetailComponent} from './car-detail/car-detail.component';
import {SellerCarListComponent} from './seller-car-list/seller-car-list.component';
import {SellerCarDetailComponent} from './seller-car-detail/seller-car-detail.component';
import {FavoriteCarListComponent} from './favorite-car-list/favorite-car-list.component';

const routes: Routes = [
  { path: 'car-list', component: CarListComponent },
  { path: 'details/:id', component: CarDetailComponent },
  { path: 'seller/details/:id', component: SellerCarDetailComponent },
  { path: 'dashboard', component: SellerCarListComponent },
  { path: 'favorites', component: FavoriteCarListComponent },
  { path: 'welcome', component: WelcomeScreenComponent },
  { path: 'welcome/:msg', component: WelcomeScreenComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
