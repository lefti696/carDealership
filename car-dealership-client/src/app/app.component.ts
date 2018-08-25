import {Component} from '@angular/core';
import {SellerCarService} from './seller-car.service';
import {Router} from '@angular/router';
import {Credentials} from './credentials';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  credentials: Credentials = {username: '', password: ''};

  constructor(private sellerCarService: SellerCarService, private router: Router, public dialog: MatDialog) {
  }

  // login() {
  //   if (this.isAuthenticated()) {
  //     this.log('User is already logged in. Redirecting to dashboard');
  //     this.router.navigateByUrl('/dashboard');
  //   } else {
  //     this.log('User is not logged in. Redirecting to login panel');
  //     this.router.navigateByUrl('/login');
  //   }
  // }

  login() {
    if (this.isAuthenticated()) {
      this.log('User is already logged in. Redirecting to dashboard');
      this.router.navigateByUrl('/dashboard');
    } else {
      this.log('User is not logged in. Redirecting to login panel');
      this.sellerCarService.authenticate(this.credentials, (returnedAuthenticationInfo: boolean) => {
        if (returnedAuthenticationInfo) {
          console.log('LoginComponent: User logged in. Redirecting to dashboard');
          this.router.navigateByUrl('/dashboard');
        } else {
          console.log('LoginComponent: Problem with logging in. Redirecting to welcome error');
          this.router.navigateByUrl('/welcome/-1');
        }
      });
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

  openDialog(): void {

    if (this.sellerCarService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    } else {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        width: '300px',
        data: {Credentials: this.credentials}
      });

      dialogRef.afterClosed().subscribe(credentialsFromDialog => {
        console.log('The dialog was closed');
        // check if username and password are filled with data
        if (null != credentialsFromDialog && credentialsFromDialog.username && credentialsFromDialog.password) {
          console.log('Submitting given username and password.');
          this.credentials.username = credentialsFromDialog.username;
          this.credentials.password = credentialsFromDialog.password;
          this.login();
        }
      });
    }
  }

}
