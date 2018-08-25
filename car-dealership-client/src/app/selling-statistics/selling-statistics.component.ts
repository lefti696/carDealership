import {Component, OnInit} from '@angular/core';
import {Car} from '../../car';
import {SellerCarService} from '../seller-car.service';

@Component({
  selector: 'app-selling-statistics',
  templateUrl: './selling-statistics.component.html',
  styleUrls: ['./selling-statistics.component.css']
})
export class SellingStatisticsComponent implements OnInit {

  date = new Date();
  listOfCars: Car[];

  nrOfAllCars: number;

  carsWithImages = 0;
  carsWithImagesMsg: string;

  basePriceOfAllCars = 0;
  retailPriceOfAllCars = 0;
  earnPrediction = 0;

  engineVolumeOfAllCars = 0;

  nrOfCarsOlderThan = 0;

  constructor(private sellerCarService: SellerCarService) {
  }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars(): void {
    this.sellerCarService.getAllCars().subscribe(
      dataFromService => {
        this.listOfCars = dataFromService;
        if (null != dataFromService) {
          this.processList();
          this.postProcessDataGeneration();
        }
      },
      (err: Response) => {
        console.log('There is an ERROR !');
        console.log(err);
      }
    );
  }

  private processList() {
    for (const car of this.listOfCars) {
      if (null != car.carImage) {
        this.carsWithImages++;
      }
      if (null != car.retailPrice && car.retailPrice > 0) {
        this.retailPriceOfAllCars = this.retailPriceOfAllCars + car.retailPrice;
      }
      if (null != car.basePrice && car.basePrice > 0) {
        this.basePriceOfAllCars = this.basePriceOfAllCars + car.basePrice;
      }
      if (null != car.engineVolume && car.engineVolume > 0) {
        this.engineVolumeOfAllCars = this.engineVolumeOfAllCars + car.engineVolume;
      }
      if (null != car.mfy && car.mfy < this.date.getFullYear().valueOf()) {
        this.nrOfCarsOlderThan++;
      }
    }
  }

  private postProcessDataGeneration() {
    if (this.carsWithImages > (this.listOfCars.length / 2)) {
      this.carsWithImagesMsg = 'More than half of your offers has pictures. Good job !';
    } else {
      this.carsWithImagesMsg = 'Adding more car pictures is suggested';
    }
    this.earnPrediction = this.retailPriceOfAllCars - this.basePriceOfAllCars;
    this.nrOfAllCars = this.listOfCars.length;
  }
}
