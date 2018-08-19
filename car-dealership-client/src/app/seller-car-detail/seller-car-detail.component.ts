import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SellerCarService} from '../seller-car.service';
import {Car} from '../../car';
import {log} from 'util';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {CarImage} from '../../carImage';
import {base64ToBlob} from '../../base64ToBlob';

@Component({
  selector: 'app-seller-car-detail',
  templateUrl: './seller-car-detail.component.html',
  styleUrls: ['./seller-car-detail.component.css']
})
export class SellerCarDetailComponent implements OnInit {

  car: Car;
  carImgUrl: SafeUrl = '/src/assets/img/car-icons.gif';
  matCardTitle: string;
  isEditMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sellerCarService: SellerCarService,
    private domSanitizer: DomSanitizer
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
          // this.log('Car from server id: ' + dataFromService.id +
          //   ' make: ' + dataFromService.make + ' color: ' + dataFromService.color);
          console.log(dataFromService);

          const carImage: CarImage = dataFromService.carImage;
          if (null != carImage) {
            this.log('Conv car image from server');

            // const blob = new Blob([carImage.data], { type: carImage.fileType });
            const blob = base64ToBlob(carImage.data, carImage.fileType);
            console.log(blob);

            this.carImgUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
          }
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
        mfy: null,
        carImage: null
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

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];

      // set up actions after reading a file
      reader.onload = () => {
        this.log('loaded file');
        this.log('file name: ' + file.name);
        this.log('file type: ' + file.type);
        this.log('file size: ' + file.size);
        // this.car.image = file;
        this.carImgUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));

        // upload file to server - PLACEHOLDER
        this.sellerCarService.upload(file, this.car.id).subscribe(
          (ret) => {
            this.log('id of car image: ' + ret);
          }
        );
      };
      // then read file
      reader.readAsDataURL(file);
    }
  }

  log(msg: string): void {
    console.log('SellerCarDetailComponent: ' + msg);
  }
}
