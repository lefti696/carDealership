import {Injectable} from '@angular/core';
import {Car} from '../car';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarOfferService {

  private carDealershipAppUrl = '//localhost:8080';

  constructor(private http: HttpClient) { }

  /** GET sample car */
  getNumberOfAvailableCars(): Observable<number> {
    console.log('getting number of available cars');
    const url = `${this.carDealershipAppUrl}/howManyCars`;
    return this.http.get<number>(url);
  }

  /** GET all available cars */
  getAllCars(): Observable<Car[]> {
    console.log('getting all available cars');
    const url = `${this.carDealershipAppUrl}/getAllCars`;
    return this.http.get<Car[]>(url);
  }

  /** GET search cars matching criteria*/
  searchCars(str: string): Observable<Car[]> {
    console.log('getting all available cars');
    const url = `${this.carDealershipAppUrl}/searchCar/${str}`;
    return this.http.get<Car[]>(url);
  }

  /** GET car by id */
  getCarById(id: number): Observable<Car> {
    console.log('getting car for id ' + id);
    const url = `${this.carDealershipAppUrl}/getCarById/${id}`;
    return this.http.get<Car>(url);
  }
}
