import { Component, OnInit } from '@angular/core';
import {CarOfferService} from '../car-offer.service';
import {Car} from '../../car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  listOfCars: Car[];

  constructor(private carOfferService: CarOfferService) {}

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars(): void {
    this.carOfferService.getAllCars().subscribe(dataFromService => this.listOfCars = dataFromService);
  }

}
