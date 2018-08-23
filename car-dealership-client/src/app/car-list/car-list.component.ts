import {Component, Inject, OnInit} from '@angular/core';
import {CarOfferService} from '../car-offer.service';
import {Car} from '../../car';
import {base64ToBlob} from '../../base64ToBlob';
import {CarImage} from '../../carImage';
import {DomSanitizer} from '@angular/platform-browser';
import {isStorageAvailable, SESSION_STORAGE, StorageService} from 'angular-webstorage-service';
import {MatSnackBar} from '@angular/material';
import {SellerCarService} from '../seller-car.service';

const STORAGE_KEY = 'fav-cars';
const STORAGE_KEY_CARS_NR = 'nr-of-fav-cars';
const sessionStorageAvailable = isStorageAvailable(sessionStorage);

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  listOfCars: Car[] = [];
  listOfFavoriteCars: number[] = [];

  constructor(private carOfferService: CarOfferService,
              private sellerCarService: SellerCarService,
              private domSanitizer: DomSanitizer,
              private snackBar: MatSnackBar,
              @Inject(SESSION_STORAGE) private storage: StorageService
  ) {
  }

  ngOnInit() {
    this.refreshListOfFavoriteCars();
    this.getAllCars();
    this.log(`Session storage available: ${sessionStorageAvailable}`);
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
}
