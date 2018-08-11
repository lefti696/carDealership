import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarListComponent} from './car-list/car-list.component';
import {WelcomeScreenComponent} from './welcome-screen/welcome-screen.component';

const routes: Routes = [
  { path: 'car-list', component: CarListComponent },
  { path: 'welcome', component: WelcomeScreenComponent },
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
