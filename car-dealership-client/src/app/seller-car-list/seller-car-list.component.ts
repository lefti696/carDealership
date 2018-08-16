import {Component, OnInit} from '@angular/core';
import {Car} from '../../car';
import {SellerCarService} from '../seller-car.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-seller-car-list',
  templateUrl: './seller-car-list.component.html',
  styleUrls: ['./seller-car-list.component.css']
})
export class SellerCarListComponent implements OnInit {

  listOfCars: Car[];
  emptyListMsg: string;

  constructor(private sellerCarService: SellerCarService, private router: Router) {
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
    this.sellerCarService.getAllCars().subscribe(dataFromService => {
      this.listOfCars = dataFromService;
      if (null != dataFromService && dataFromService.length === 0) {
        this.emptyListMsg = 'Currently there are no cars for sale. Please add any.';
      }
    });
  }


  log(msg: string): void {
    console.log('SellerCarListComponent: ' + msg);
  }

  addNewCar() {
    this.router.navigateByUrl('/seller/details/-1');
  }
}
