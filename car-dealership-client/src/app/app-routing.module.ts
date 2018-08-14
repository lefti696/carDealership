import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarListComponent} from './car-list/car-list.component';
import {WelcomeScreenComponent} from './welcome-screen/welcome-screen.component';
import {CarDetailComponent} from './car-detail/car-detail.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {SellerCarListComponent} from './seller-car-list/seller-car-list.component';

const routes: Routes = [
  { path: 'car-list', component: CarListComponent },
  { path: 'details/:id', component: CarDetailComponent },
  { path: 'welcome', component: WelcomeScreenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard', component: SellerCarListComponent },
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
