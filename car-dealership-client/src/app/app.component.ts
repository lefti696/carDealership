import { Component } from '@angular/core';
import {SellerCarService} from './seller-car.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private sellerCarService: SellerCarService, private router: Router) {
  }

  login() {
    if (this.isAuthenticated()) {
      this.log('User is already logged in. Redirecting to dashboard');
      this.router.navigateByUrl('/dashboard');
    } else {
      this.log('User is not logged in. Redirecting to login panel');
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    this.sellerCarService.logout();
    if (!this.isAuthenticated()) {
      this.log('User logged out. Redirecting ...');
      this.router.navigateByUrl('/welcome');
    }
  }

  isAuthenticated() {
    return this.sellerCarService.isAuthenticated();
  }

  log(msg: string): void {
    console.log('AppComponent: ' + msg);
  }

}
