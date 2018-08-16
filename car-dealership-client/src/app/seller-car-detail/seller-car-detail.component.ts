import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SellerCarService} from '../seller-car.service';
import {Car} from '../../car';
import {log} from 'util';

@Component({
  selector: 'app-seller-car-detail',
  templateUrl: './seller-car-detail.component.html',
  styleUrls: ['./seller-car-detail.component.css']
})
export class SellerCarDetailComponent implements OnInit {

  car: Car;
  matCardTitle: string;
  isEditMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sellerCarService: SellerCarService
  ) {
  }

  ngOnInit() {
    this.getCarById();
  }

  getCarById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.log('Getting selling details for car with id: ' + id);
    if (id >= 0) {
      this.sellerCarService.getCarById(id).subscribe(
        dataFromService => {
          this.car = dataFromService;
          console.log('id: ' + dataFromService.id + ' make: ' + dataFromService.make + ' color: ' + dataFromService.color);
          this.matCardTitle = 'Details of:';
          this.isEditMode = true;
        }
      );
    } else {
      // create new car for sale
      const newCar: Car = {
        id: null,
        make: null,
        color: null,
        model: null,
        mfy: null
      };
      this.matCardTitle = 'Enter new car details:';
      this.car = newCar;
      this.isEditMode = false;
    }
  }

  inEditMode(): boolean {
    return this.isEditMode;
  }

  goBack(): void {
    this.location.back();
  }

  delete(car: Car): void {
    console.log('Deleting car with id: ' + car.id);
    this.sellerCarService.deleteCar(car).subscribe(
      () => {
        this.log('redirecting to dashboard after deleting');
        this.router.navigateByUrl('/dashboard');
      }
    );
  }

  edit(): void {
    log('updating: ' + this.car.color + ' ' + this.car.make);
    this.sellerCarService.updateCar(this.car).subscribe(
      () => {
        this.log('redirecting to dashboard after deleting');
        this.router.navigateByUrl('/dashboard');
      });
  }

  addNew(): void {
    this.sellerCarService.addNewCar(this.car).subscribe(
      () => {
        this.log('redirecting to dashboard after adding new car');
        this.router.navigateByUrl('/dashboard');
      });
  }

  log(msg: string): void {
    console.log('SellerCarDetailComponent: ' + msg);
  }

}
