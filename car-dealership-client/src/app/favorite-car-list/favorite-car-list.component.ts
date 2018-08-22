import {Component, Inject, OnInit} from '@angular/core';
import {isStorageAvailable, SESSION_STORAGE, StorageService} from 'angular-webstorage-service';
import {Car} from '../../car';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material';
import {base64ToBlob} from '../../base64ToBlob';
import {CarImage} from '../../carImage';
import {CarOfferService} from '../car-offer.service';
import {DomSanitizer} from '@angular/platform-browser';

const STORAGE_KEY = 'fav-cars';
const sessionStorageAvailable = isStorageAvailable(sessionStorage);

@Component({
  selector: 'app-favorite-car-list',
  templateUrl: './favorite-car-list.component.html',
  styleUrls: ['./favorite-car-list.component.css']
})
export class FavoriteCarListComponent implements OnInit {

  listOfCars: Car[] = [];
  listOfFavoriteCars: number[];

  constructor(
    private location: Location,
    private domSanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private carOfferService: CarOfferService,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.refreshListOfFavoriteCars();
    this.getAllCars();
  }

  goBack(): void {
    this.location.back();
  }

  private refreshListOfFavoriteCars() {
    this.listOfFavoriteCars = this.storage.get(STORAGE_KEY);
    if (null === this.listOfFavoriteCars) {
      this.log('No listOfFavoriteCars in session.');
      this.listOfFavoriteCars = [];
    }
  }

  getAllCars(): void {
    this.carOfferService.getAllCars().subscribe(
      dataFromService => {
        const listOfCarsFromService = dataFromService;
        this.fillImages(listOfCarsFromService);
        this.checkIfCarIsFavourite(listOfCarsFromService);
      });
  }

  fillImages(listOfCarsFromService: Car[]) {
    for (const car of listOfCarsFromService) {
      if (null != car.carImage) {
        const blob = base64ToBlob(car.carImage.data, car.carImage.fileType);
        car.carImage.carImgUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      } else {
        car.carImage = new CarImage();
        car.carImage.carImgUrl = '/src/assets/img/car-icons.gif';
      }
    }
  }

  private checkIfCarIsFavourite(listOfCarsFromService: Car[]) {
    for (const car of listOfCarsFromService) {
      if (this.listOfFavoriteCars.includes(car.id)) {
        car.isFavorite = true;
        this.listOfCars.push(car);
      } else {
        car.isFavorite = false;
      }
    }
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

  isSessionAvailable() {
    return sessionStorageAvailable;
  }


  log(msg: string) {
    console.log('CarListComponent: ' + msg);
  }

  isListEmpty() {
    return this.listOfCars.length === 0;
  }
}
