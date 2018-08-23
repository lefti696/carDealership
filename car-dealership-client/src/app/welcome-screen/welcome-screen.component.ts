import {Component, Inject, OnInit} from '@angular/core';
import {CarOfferService} from '../car-offer.service';
import {MatDialog} from '@angular/material';
import {SESSION_STORAGE, StorageService} from 'angular-webstorage-service';
import {SellerCarService} from '../seller-car.service';
import {NotificationDialogComponent} from '../notification-dialog/notification-dialog.component';
import {ActivatedRoute} from '@angular/router';

const STORAGE_KEY_CARS_NR = 'nr-of-fav-cars';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {

  title = 'Welcome to your Local Car Dealership !';
  numberOfAvailableCars: number;
  numberOfAvailableCarsFromSession: number;
  msg: string;

  constructor(
    private route: ActivatedRoute,
    private carOfferService: CarOfferService,
    private sellerCarService: SellerCarService,
    public dialog: MatDialog,
    @Inject(SESSION_STORAGE) private storage: StorageService) {
  }

  ngOnInit() {
    if (-1 === +this.route.snapshot.paramMap.get('msg')) {
      this.msg = 'Unauthorized or wrong login data';
    }
    this.setNumberOfAvailableCars();
  }

  setNumberOfAvailableCars(): void {
    this.carOfferService.getNumberOfAvailableCars()
      .subscribe(dataFromService => {
        this.numberOfAvailableCars = dataFromService;
        console.log('Number of all available cars: ' + dataFromService);
        if (!this.sellerCarService.isAuthenticated()) {
          console.log('checking for a new car');
          this.checkIfThereAreNewCars();
        }
      });
  }

  openDialog(newCarsCounter: number): void {
    const dialogRef = this.dialog.open(NotificationDialogComponent
      , {
      width: '300px',
      data: {newCarsSinceLastVisit: newCarsCounter}
    });
    // set new number of cars
  }

  private checkIfThereAreNewCars() {
    this.numberOfAvailableCarsFromSession = this.storage.get(STORAGE_KEY_CARS_NR);
    if (null != this.numberOfAvailableCarsFromSession) {
      const newCarsNumber = this.numberOfAvailableCars - this.numberOfAvailableCarsFromSession;
      if (newCarsNumber > 0) {
        console.log('There are new cars since last visit');
        this.openDialog(newCarsNumber);
      } else {
        console.log('No new cars since last visit');
      }
    } else {
      console.log('No new cars since last visit');
    }
  }


}
