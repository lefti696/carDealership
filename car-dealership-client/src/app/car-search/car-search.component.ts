import {Component, OnInit} from '@angular/core';
import {CarOfferService} from '../car-offer.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {Car} from '../../car';
import {base64ToBlob} from '../../base64ToBlob';
import {CarImage} from '../../carImage';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.css']
})
export class CarSearchComponent implements OnInit {

  cars$: Observable<Car[]>;
  cars: Car[];
  private searchTerms = new Subject<string>();

  constructor(private carOfferService: CarOfferService, private domSanitizer: DomSanitizer) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.cars$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // It cancels and discards previous search observables, returning only the latest search service observable.
      switchMap((term: string) => term ? this.carOfferService.searchCars(term) : of([]))
    );

    this.cars$.subscribe(
      cars => {
        this.cars = cars;
        this.fillImages(cars);
      }
    );
  }

  fillImages(listOfCars: Car[]) {
    for (const car of listOfCars) {
      if (null != car.carImage) {
        console.log(car);
        const blob = base64ToBlob(car.carImage.data, car.carImage.fileType);
        car.carImage.carImgUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      } else {
        car.carImage = new CarImage();
        car.carImage.carImgUrl = '/src/assets/img/car-icons.gif';
      }
    }
  }

}
