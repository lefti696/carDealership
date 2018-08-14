import { Component, OnInit } from '@angular/core';
import {Car} from '../../car';
import {SellerCarService} from '../seller-car.service';

@Component({
  selector: 'app-seller-car-list',
  templateUrl: './seller-car-list.component.html',
  styleUrls: ['./seller-car-list.component.css']
})
export class SellerCarListComponent implements OnInit {

  listOfCars: Car[];

  constructor(private sellerCarService: SellerCarService) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars(): void {
    this.sellerCarService.getAllCars().subscribe(dataFromService => this.listOfCars = dataFromService);
  }
}
