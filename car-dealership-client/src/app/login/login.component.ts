import {Component, Input, OnInit} from '@angular/core';
import {SellerCarService} from '../seller-car.service';
import {Router} from '@angular/router';
import {Credentials} from '../credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Credentials = {username: '', password: ''};

  constructor(private sellerCarService: SellerCarService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.sellerCarService.authenticate(this.credentials, () => {
      console.log('LoginComponent: User logged in. Redirecting ...');
      this.router.navigateByUrl('/dashboard');
    });
  }

}
