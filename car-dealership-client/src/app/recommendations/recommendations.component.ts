import {Component, OnInit} from '@angular/core';
import {Car} from '../../car';
import {CarOfferService} from '../car-offer.service';
import {DomSanitizer} from '@angular/platform-browser';
import {base64ToBlob} from '../../base64ToBlob';
import {CarImage} from '../../carImage';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  listOfRecommendedCars: Car[] = [];
  listOfAllCars: Car[] = [];
  generatedNumbers: number[] = [];
  numberOfColumns: number;

  constructor(
    private carOfferService: CarOfferService,
    private domSanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.log('setting up recommendations');
    this.getAllCars();
  }

  getAllCars(): void {
    this.carOfferService.getAllCars().subscribe(
      dataFromService => {
        this.filterOnlyRecommended(dataFromService);
        this.fillImages();
        this.selectCarRecommendations();
      });
  }

  fillImages() {
    for (const car of this.listOfAllCars) {
      if (null != car.carImage) {
        const blob = base64ToBlob(car.carImage.data, car.carImage.fileType);
        car.carImage.carImgUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      } else {
        car.carImage = new CarImage();
        car.carImage.carImgUrl = '/src/assets/img/car-icons.gif';
      }
    }
  }

  private selectCarRecommendations() {
    console.log(this.listOfAllCars);
    // if more than 3 recommended cars, need to pick only 3
    if (this.listOfAllCars.length > 2) {
      // starting from zero
      while (this.listOfRecommendedCars.length < 3) {
        const generatedNumber = this.getRandomInt(0, this.listOfAllCars.length - 1);
        if (!this.generatedNumbers.includes(generatedNumber)) {
          this.generatedNumbers.push(generatedNumber);
          this.listOfRecommendedCars.push(this.listOfAllCars[generatedNumber]);
        }
      }
    } else if (this.listOfAllCars.length === 2) {
      while (this.listOfRecommendedCars.length < 2) {
        const generatedNumber = this.getRandomInt(0, this.listOfAllCars.length - 1);
        if (!this.generatedNumbers.includes(generatedNumber)) {
          this.generatedNumbers.push(generatedNumber);
          this.listOfRecommendedCars.push(this.listOfAllCars[generatedNumber]);
        }
      }
    } else {
      this.listOfRecommendedCars = this.listOfAllCars;
    }
    console.log(this.generatedNumbers);
    console.log(this.listOfRecommendedCars);

    this.numberOfColumns = this.setNumberOfColumns();
  }

  private getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private filterOnlyRecommended(carList: Car[]) {
    for (const car of carList) {
      if (car.recommended) {
        this.listOfAllCars.push(car);
      }
    }
    this.log(' total recommended cars: ' + this.listOfAllCars.length);
  }

  private log(msg: string) {
    console.log('RecommendationsComponent: ' + msg);
  }

  private setNumberOfColumns() {
    if (this.listOfRecommendedCars.length > 3) {
      return 3;
    } else {
      return this.listOfRecommendedCars.length;
    }
  }
}
