import {Component, Inject, OnInit} from '@angular/core';
import {Car} from '../../car';
import {CarOfferService} from '../car-offer.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {isStorageAvailable, SESSION_STORAGE, StorageService} from 'angular-webstorage-service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {base64ToBlob} from '../../base64ToBlob';
import {CarImage} from '../../carImage';
import {DomSanitizer} from '@angular/platform-browser';
import {Question} from '../../question';
import {QuestionDialogComponent} from '../question-dialog/question-dialog.component';

const STORAGE_KEY = 'fav-cars';
const sessionStorageAvailable = isStorageAvailable(sessionStorage);

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: Car;
  listOfFavoriteCars: number[];
  carQuestion: Question;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private carOfferService: CarOfferService,
    private snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {
  }

  ngOnInit() {
    this.getCarById();
    this.refreshListOfFavoriteCars();
    console.log(`Session storage available: ${sessionStorageAvailable}`);
  }

  getCarById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('getting details for car with id: ' + id);
    this.carOfferService.getCarById(id).subscribe(dataFromService => {
      this.car = dataFromService;
      this.car.isFavorite = this.checkIfCarIsFavourite(this.car);
      this.fillImage();
    });
  }

  fillImage() {
    if (null != this.car.carImage) {
      const blob = base64ToBlob(this.car.carImage.data, this.car.carImage.fileType);
      this.car.carImage.carImgUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    } else {
      this.car.carImage = new CarImage();
      this.car.carImage.carImgUrl = '/src/assets/img/car-icons.gif';
    }
  }

  goBack(): void {
    this.location.back();
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

  log(msg: string) {
    console.log('CarDetailComponent: ' + msg);
  }

  isSessionAvailable() {
    return sessionStorageAvailable;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '600 px',
      data: {id: this.car.id}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  private checkIfCarIsFavourite(car: Car): boolean {
    return (this.listOfFavoriteCars.includes(car.id));
  }

  private refreshListOfFavoriteCars() {
    this.listOfFavoriteCars = this.storage.get(STORAGE_KEY);
    if (null === this.listOfFavoriteCars) {
      this.log('No listOfFavoriteCars in session.');
      this.listOfFavoriteCars = [];
    }
  }
}
