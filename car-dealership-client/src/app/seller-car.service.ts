import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Car} from '../car';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

const predefinedCredentials = {
  username: 'user',
  password: 'password'
};

const httpOptions = {
  headers: new HttpHeaders({
    authorization: 'Basic ' + btoa(predefinedCredentials.username + ':' + predefinedCredentials.password)
  })
};

@Injectable({
  providedIn: 'root'
})

export class SellerCarService {

  authenticated = false;

  private baseCarDealershipAppUrl = '//localhost:8080';
  private carSellerDealershipAppUrl = '//localhost:8080/seller';

  constructor(private http: HttpClient) {
  }

  /** GET all available cars */
  getAllCars(): Observable<Car[]> {

    this.log('Getting all available cars. for: {' + httpOptions.headers.keys() + ':' + httpOptions.headers.get('authorization'));
    const url = `${this.carSellerDealershipAppUrl}/getAllCars`;
    return this.http.get<Car[]>(url, httpOptions);
  }

  /** GET car by id */
  getCarById(id: number): Observable<Car> {

    this.log('Getting car for id ' + id + ' for: {' + httpOptions.headers.keys() + ':' + httpOptions.headers.get('authorization'));

    const url = `${this.carSellerDealershipAppUrl}/getCarById/${id}`;
    return this.http.get<Car>(url, httpOptions);
  }

  /** DELETE: delete the car from the server
   *  can be passed by id:number or whole object */
  deleteCar(car: Car | number): Observable<Car> {
    const id = typeof car === 'number' ? car : car.id;
    this.log(id.toString());
    const url = `${this.carSellerDealershipAppUrl}/deleteCar/${id}`;

    return this.http.delete<Car>(url, httpOptions);
  }

  /** PUT: update the car on the server */
  updateCar(car: Car): Observable<any> {

    const url = `${this.carSellerDealershipAppUrl}/updateCar`;

    return this.http.put(url, car, httpOptions).pipe(
      tap(_ => this.log(`updated car id=${car.id}`)),
      catchError(this.handleError<any>('updateCar'))
    );
  }

  /** POST: add a new hero to the server */
  addNewCar(car: Car): Observable<Car> {
    const url = `${this.carSellerDealershipAppUrl}/addNewCar`;

    return this.http.post<Car>(url, car, httpOptions).pipe(
      catchError(this.handleError<Car>('addHero'))
    );
  }

  authenticate(credentials, callback) {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
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

  /**
   * UPLOAD FILE HANDLING
   */

  public upload(file: File, carId: number): Observable<any> {
    this.log('sending file');

    // return this.http.post<Car>(url, car, httpOptions);

    // create destination url
    const url = `${this.carSellerDealershipAppUrl}/upload/${carId}`;

    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // send the http-request and subscribe for progress-updates
    return this.http.post(url, formData, httpOptions);
  }

  logout(): void {
    this.log('Logout requested.');
    const url = `${this.baseCarDealershipAppUrl}/logout`;
    this.http.post(url, {}).subscribe();
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  log(msg: string): void {
    console.log('SellerCarService: ' + msg);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
