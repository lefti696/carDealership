import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Car} from '../car';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SellerCarService {

  authenticated = false;

  private baseCarDealershipAppUrl = '//localhost:8080';
  private carSellerDealershipAppUrl = '//localhost:8080/seller';

  constructor(private http: HttpClient) { }

  /** GET all available cars */
  getAllCars(): Observable<Car[]> {

    const credentials = {
      username: 'user',
      password: 'password'
    };
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.log('Getting all available cars. for: {' + headers.keys() + ':' + headers.get('authorization'));
    const url = `${this.carSellerDealershipAppUrl}/getAllCars`;
    return this.http.get<Car[]>(url, {headers: headers});
  }

  /** GET car by id */
  getCarById(id: number): Observable<Car> {

    const credentials = {
      username: 'user',
      password: 'password'
    };
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.log('Getting car for id ' + id + ' for: {' + headers.keys() + ':' + headers.get('authorization'));

    const url = `${this.carSellerDealershipAppUrl}/getCarById/${id}`;
    return this.http.get<Car>(url, {headers: headers});
  }

  authenticate(credentials, callback) {
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    const url = `${this.baseCarDealershipAppUrl}/user`;
    this.log('Checking user authentication on server...');
    this.http.get(url, {headers: headers}).subscribe(response => {
      if (response['name']) {
        this.authenticated = true;
        this.log('User {' + response['name'] + '} is authenticated to server.');
      } else {
        this.authenticated = false;
        this.log('User is NOT authenticated to server.');
      }
      return callback && callback();
    });
  }

  logout (): void {
    this.log('Logout requested.');
    const url = `${this.baseCarDealershipAppUrl}/logout`;
    this.http.post(url, {}).subscribe();
    this.authenticated = false;
  }

  isAuthenticated() {
    // this.log('checking authentication: ' + this.authenticated);
    return this.authenticated;
  }

  log(msg: string): void {
    console.log('SellerCarService: ' + msg);
  }
}
