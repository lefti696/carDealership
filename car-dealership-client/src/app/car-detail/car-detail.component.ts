import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../../car';
import {CarOfferService} from '../car-offer.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  @Input() car: Car;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private carOfferService: CarOfferService
  ) {}

  ngOnInit() {
    this.getCarById();
  }

  getCarById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('getting details for car with id: ' + id);
    this.carOfferService.getCarById(id).subscribe(dataFromService => this.car = dataFromService);
  }

  goBack(): void {
    this.location.back();
  }

}
