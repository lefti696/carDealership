import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {SellerCarService} from '../seller-car.service';
import {Car} from '../../car';

@Component({
  selector: 'app-seller-car-detail',
  templateUrl: './seller-car-detail.component.html',
  styleUrls: ['./seller-car-detail.component.css']
})
export class SellerCarDetailComponent implements OnInit {

  car: Car;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private sellerCarService: SellerCarService
  ) { }

  ngOnInit() {
    this.getCarById();
  }

  getCarById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('Getting selling details for car with id: ' + id);
    this.sellerCarService.getCarById(id).subscribe(
      dataFromService => {
        this.car = dataFromService;
        console.log('id: ' + dataFromService.id + ' make: ' + dataFromService.make + ' color: ' + dataFromService.color);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  delete(): void {

  }

  save(): void {

  }

}
