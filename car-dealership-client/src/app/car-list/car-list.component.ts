import {Component, Inject, OnInit} from '@angular/core';
import {CarOfferService} from '../car-offer.service';
import {Car} from '../../car';
import {base64ToBlob} from '../../base64ToBlob';
import {CarImage} from '../../carImage';
import {DomSanitizer} from '@angular/platform-browser';
import {isStorageAvailable, SESSION_STORAGE, StorageService} from 'angular-webstorage-service';
import {MatSnackBar} from '@angular/material';
import {SellerCarService} from '../seller-car.service';
import {Router} from '@angular/router';

const STORAGE_KEY = 'fav-cars';
const STORAGE_KEY_CARS_NR = 'last-car-count';
const sessionStorageAvailable = isStorageAvailable(sessionStorage);

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  listOfCars: Car[] = [];
  listOfCarsBackedUp: Car[];
  listOfFavoriteCars: number[] = [];

  listOfPrices: number[];
  maxPriceSelected: number;
  minPriceSelected: number;
  filterMsg: string;
  filterErrMsg: string;
  sliderChecked = false;

  constructor(private carOfferService: CarOfferService,
              private sellerCarService: SellerCarService,
              private domSanitizer: DomSanitizer,
              private snackBar: MatSnackBar,
              private router: Router,
              @Inject(SESSION_STORAGE) private storage: StorageService
  ) {
  }

  ngOnInit() {
    this.refreshListOfFavoriteCars();
    this.getAllCars();
    this.log(`Session storage available: ${sessionStorageAvailable}`);
    this.fillListOfPricesForDropDown();

    // scroll to bottom if redirected
    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }
    //   window.scrollTo(0, document.body.scrollHeight);
    // });
  }

  getAllCars(): void {
    this.carOfferService.getAllCars().subscribe(
      dataFromService => {
        this.listOfCars = dataFromService;
        this.fillImages();
        this.checkIfCarIsFavourite();
        if (!this.sellerCarService.isAuthenticated()) {
          this.log('saving number of available cars');
          this.storage.set(STORAGE_KEY_CARS_NR, this.listOfCars.length);
        }
      });
  }

  fillImages() {
    for (const car of this.listOfCars) {
      if (null != car.carImage) {
        const blob = base64ToBlob(car.carImage.data, car.carImage.fileType);
        car.carImage.carImgUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      } else {
        car.carImage = new CarImage();
        car.carImage.carImgUrl = '/src/assets/img/car-icons.gif';
      }
    }
  }

  isSessionAvailable() {
    return sessionStorageAvailable;
  }

  removeFromFavorite(car: Car) {
    this.log('Removing car with id: ' + car.id + ' from favorites.');
    this.refreshListOfFavoriteCars();
    if (this.listOfFavoriteCars.includes(car.id)) {
      // remove car from list
      this.listOfFavoriteCars = this.listOfFavoriteCars.filter(cId => cId !== car.id);
      this.storage.set(STORAGE_KEY, this.listOfFavoriteCars);
      car.isFavorite = false;
      this.log('removed');
    }
  }

  addToFavorite(car: Car) {
    this.log('Adding car with id: ' + car.id + ' to favorites.');
    this.refreshListOfFavoriteCars();
    if (!this.listOfFavoriteCars.includes(car.id)) {
      console.log(this.listOfFavoriteCars);
      this.listOfFavoriteCars.push(car.id);
      this.storage.set(STORAGE_KEY, this.listOfFavoriteCars);
      car.isFavorite = true;
      this.log('added');
    }
  }

  log(msg: string) {
    console.log('CarListComponent: ' + msg);
  }

  toggleFavorite(car: Car) {

    this.refreshListOfFavoriteCars();
    if (this.listOfFavoriteCars.includes(car.id)) {
      car.isFavorite = false;
      // remove car from list
      this.listOfFavoriteCars = this.listOfFavoriteCars.filter(cId => cId !== car.id);
      this.storage.set(STORAGE_KEY, this.listOfFavoriteCars);
      this.log('Toggle removed from favorite car with id: ' + car.id);
      const snackBarRef = this.snackBar.open('Car removed from favorites', 'Undo', {
        duration: 2000,
      });
      snackBarRef.onAction().subscribe(() => {
        console.log('The snack-bar action was triggered!');
        // cancel
        car.isFavorite = true;
        this.listOfFavoriteCars.push(car.id);
        this.storage.set(STORAGE_KEY, this.listOfFavoriteCars);
        this.log('Returning to favorites car with id: ' + car.id);
      });
    } else {
      const snackBarRef = this.snackBar.open('Car added to favorites', 'Undo', {
        duration: 2000,
      });
      car.isFavorite = true;
      this.listOfFavoriteCars.push(car.id);
      this.storage.set(STORAGE_KEY, this.listOfFavoriteCars);
      this.log('Toggle added from favorite car with id: ' + car.id);
      snackBarRef.onAction().subscribe(() => {
        console.log('The snack-bar action was triggered!');
        // cancel
        car.isFavorite = false;
        // remove car from list
        this.listOfFavoriteCars = this.listOfFavoriteCars.filter(cId => cId !== car.id);
        this.storage.set(STORAGE_KEY, this.listOfFavoriteCars);
        this.log('Undo add to favorites car with id: ' + car.id);
      });
    }
  }

  filterResults(event) {
    console.log('event:' + event);
    if (event.checked === true) {
      this.sliderChecked = true;
      console.log('filtering results');

      if (null == this.listOfCarsBackedUp || this.listOfCarsBackedUp.length <= 0) {
        console.log('Backing up car list');
        this.listOfCarsBackedUp = this.listOfCars;
      } else {
        console.log('Car list already backed up');
      }

      if ((this.minPriceSelected > this.maxPriceSelected) || (this.maxPriceSelected === 0)
        || null == this.minPriceSelected || null == this.maxPriceSelected) {
        this.filterErrMsg = 'Invalid price range';
      } else {
        // proceed with filtering
        const tempListOfCars: Car[] = [];
        for (const car of this.listOfCarsBackedUp) {
          if (null != car.retailPrice && car.retailPrice >= this.minPriceSelected && car.retailPrice <= this.maxPriceSelected) {
            tempListOfCars.push(car);
          }
        }
        this.filterMsg = 'Found: ' + tempListOfCars.length + ' cars';
        this.listOfCars = tempListOfCars;
      }
    }
    if (event.checked === false) {
      this.sliderChecked = false;
      console.log('removing filtering');
      this.listOfCars = this.listOfCarsBackedUp;
      this.filterErrMsg = null;
      this.filterMsg = null;
      this.maxPriceSelected = null;
      this.minPriceSelected = null;
    }
  }

  public updatePriceSelection(event) {
    console.log('updatePriceSelection: ' + this.minPriceSelected + ' - ' + this.maxPriceSelected);
    if (this.sliderChecked === true) {
      event.checked = true;
      this.filterResults(event);
    }
  }

  private fillListOfPricesForDropDown() {
    const priceList: number[] = [];
    // less than milion
    for (let i = 0; i < 1000000; i = i + 10000) {
      priceList.push(i);
    }
    this.listOfPrices = priceList;
  }

  private checkIfCarIsFavourite() {
    for (const car of this.listOfCars) {
      if (this.listOfFavoriteCars.includes(car.id)) {
        car.isFavorite = true;
      } else {
        car.isFavorite = false;
      }
    }
  }

  private refreshListOfFavoriteCars() {
    this.listOfFavoriteCars = this.storage.get(STORAGE_KEY);
    if (null === this.listOfFavoriteCars) {
      this.log('No listOfFavoriteCars in session.');
      this.listOfFavoriteCars = [];
    }
  }
}
