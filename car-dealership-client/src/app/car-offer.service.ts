import {Injectable} from '@angular/core';
import {Car} from '../car';
import {CAR} from '../mock-car';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CarOfferService {

  private carDealershipAppUrl = '//localhost:8080/getFirstCarFromDb';

  constructor(private http: HttpClient) { }

  getSampleCar(): Observable<Car> {
    return of(CAR);
  }

  /** GET car by id */
  getCarDetails(id: number): Observable<Car> {
    console.log('getting car for id ' + id);
    // const url = `${this.carDealershipAppUrl}/getFirstCarFromDb`;
    return this.http.get<Car>(this.carDealershipAppUrl);
  }

  // getCarDetails(id: number): Observable<Car> {
  //   console.log('getting car for id ' + id);
  //   return of(CAR);
  // }

  // /** GET hero by id. Will 404 if id not found */
  // getHero(id: number): Observable<Hero> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.get<Hero>(url).pipe(
  //     tap(_ => this.log(`fetched hero id=${id}`)),
  //     catchError(this.handleError<Hero>(`getHero id=${id}`))
  //   );
  // }

}
