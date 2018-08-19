import {Component, OnInit} from '@angular/core';
import {CarOfferService} from '../car-offer.service';
import {Car} from '../../car';
import {base64ToBlob} from '../../base64ToBlob';
import {CarImage} from '../../carImage';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  listOfCars: Car[];

  constructor(private carOfferService: CarOfferService, private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars(): void {
    this.carOfferService.getAllCars().subscribe(
      dataFromService => {
        this.listOfCars = dataFromService;
        this.fillImages();
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

}
