import {Component, OnInit} from '@angular/core';
import {Car} from '../../car';
import {CarOfferService} from '../car-offer.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  aCar: Car;

  helloCarDetails: string;

  constructor(private carOfferService: CarOfferService) {}

  ngOnInit() {
    this.helloCarDetails = 'car details works !';
    // this.getSampleCar();
    this.getCarDetails(3);
  }

  getSampleCar(): void {
    this.carOfferService.getSampleCar().subscribe( carFromService => this.aCar = carFromService);
  }

  getCarDetails(id: number): void {
    this.carOfferService.getCarDetails(id).subscribe(dataFromService => this.aCar = dataFromService);
  }

}
