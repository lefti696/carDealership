import {Component, OnInit} from '@angular/core';
import {Car} from '../../car';
import {SellerCarService} from '../seller-car.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {base64ToBlob} from '../../base64ToBlob';
import {CarImage} from '../../carImage';

@Component({
  selector: 'app-seller-car-list',
  templateUrl: './seller-car-list.component.html',
  styleUrls: ['./seller-car-list.component.css']
})
export class SellerCarListComponent implements OnInit {

  listOfCars: Car[];
  emptyListMsg: string;

  constructor(
    private sellerCarService: SellerCarService,
    private router: Router,
    private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getAllCars();
  }

  isEmptyList(): boolean {
    if (null != this.listOfCars) {
      return this.listOfCars.length === 0;
    } else {
      return true;
    }
  }

  getAllCars(): void {
    this.sellerCarService.getAllCars().subscribe(
      dataFromService => {
        this.listOfCars = dataFromService;
        if (null != dataFromService && dataFromService.length === 0) {
          this.emptyListMsg = 'Currently there are no cars for sale. Please add any.';
        } else {
          this.fillImages();
        }
      },
      (err: Response) => {
        this.log('There is an ERROR !');
        console.log(err);
        if (err.status === 401) {
          this.router.navigateByUrl('/welcome/-1');
        }
      }
    );
  }


  log(msg: string): void {
    console.log('SellerCarListComponent: ' + msg);
  }

  addNewCar() {
    this.router.navigateByUrl('/seller/details/-1');
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
