import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SellerCarService} from '../seller-car.service';
import {Car} from '../../car';
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
  // for different mat card buttons
  isEditMode: boolean;
  // validation messages
  validationErr: string[] = [];
  // for slider
  sliderMinValue: number;
  sliderMaxValue: number;
  shortPrice: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sellerCarService: SellerCarService,
    private domSanitizer: DomSanitizer
  ) {
  }

  // for slider
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000);
    }
    return value;
  }

  ngOnInit() {
    this.getCarById();
  }

  setMinMaxPrice() {
    if (null == this.car.basePrice || 0 === this.car.basePrice) {
      console.log('setting up default values for slider');
      this.sliderMinValue = 0;
      this.sliderMaxValue = 1000000;
    } else {
      console.log('setting up values for slider based on price');
      this.sliderMinValue = this.car.basePrice;
      this.sliderMaxValue = this.car.basePrice * 1.5;
    }
    if (null == this.car.retailPrice || 0 === this.car.retailPrice) {
      this.shortPrice = 0;
    } else {
      this.shortPrice = this.car.retailPrice / 1000;
    }
  }

  getCarById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.log('Getting selling details for car with id: ' + id);
    if (id >= 0) {
      this.sellerCarService.getCarById(id).subscribe(
        dataFromService => {

          this.car = dataFromService;
          this.log('Car from server with id: ' + dataFromService.id +
            ' make: ' + dataFromService.make + ' color: ' + dataFromService.color);
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
          this.setMinMaxPrice();
        }
      );
    } else {
      // create new car for sale
      const newCar: Car = {
        id: null,
        make: '',
        color: '',
        model: '',
        mfy: 2018,
        carImage: null,
        isFavorite: false,
        recommended: false,
        basePrice: 0,
        description: '',
        mfm: null,
        retailPrice: 0,
        sellerNote: '',
        engineDescription: '',
        engineVolume: 0
      };
      this.matCardTitle = 'Enter new car details:';
      this.car = newCar;
      this.isEditMode = false;
      this.setMinMaxPrice();
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
    console.log('updating: ' + this.car.color + ' ' + this.car.make);
    this.sellerCarService.updateCar(this.car).subscribe(
      () => {
        this.log('redirecting to dashboard after deleting');
        this.router.navigateByUrl('/dashboard');
      });
  }

  addNew(): void {
    console.log('validating form');
    this.validationErr = [];
    if (null == this.car.basePrice || this.car.basePrice <= 0 || null == this.car.retailPrice || this.car.retailPrice <= 0) {
      this.validationErr.push('Please fill price details');
    }
    if (null == this.car.engineVolume || this.car.engineVolume <= 0) {
      this.validationErr.push('Please fill engine volume');
    }
    if (!this.car.make) {
      this.validationErr.push('Make of car has to be filled');
    }
    if (!this.car.model) {
      this.validationErr.push('Model of car has to be filled');
    }

    if (null == this.validationErr || this.validationErr.length === 0) {
      console.log('no errors proceeding');
      this.sellerCarService.addNewCar(this.car).subscribe(
        (carId) => {
          console.log('Created car id: ' + carId);
          this.log('redirecting to dashboard after adding new car');
          this.router.navigateByUrl('/dashboard');
        });
    }
  }

  onFileChange(event) {
    console.log(this.car);

    if (null === this.car.id) {
      console.log('car id is null');
      if (null != this.car.make && this.car.make.length > 0 && null != this.car.model && this.car.model.length > 0) {
        console.log('creating new car');
        this.sellerCarService.addNewCar(this.car).subscribe(carId => {
          console.log('Created car id: ' + carId);
          this.car.id = carId;
          this.setMinMaxPrice();
          this.uploadFile(event);
        });
      } else {
        this.validationErr.push('Fill at least make and model to upload image');
      }
    } else {
      this.uploadFile(event);
    }
  }

  uploadFile(event): void {
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

        this.sellerCarService.upload(file, this.car.id).subscribe(
          (ret) => {
            this.log('id of car image: ' + ret);
            this.isEditMode = true;
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
