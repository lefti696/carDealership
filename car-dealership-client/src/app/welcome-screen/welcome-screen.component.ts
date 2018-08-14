import { Component, OnInit } from '@angular/core';
import {CarOfferService} from '../car-offer.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {

  title = 'Welcome to your Local Car Dealership !';
  numberOfAvailableCars: number;

  constructor(private carOfferService: CarOfferService) { }

  ngOnInit() {
    this.setNumberOfAvailableCars();
  }

  setNumberOfAvailableCars(): void {
    this.carOfferService.getNumberOfAvailableCars()
      .subscribe(dataFromService => {
        this.numberOfAvailableCars = dataFromService;
        console.log('Number of all available cars: ' + dataFromService);
      });
  }


}
