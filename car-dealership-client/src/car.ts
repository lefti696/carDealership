import {CarImage} from './carImage';

export class Car {

  id: number;
  color: string;
  make: string;
  model: string;
  mfy: number;
  mfm: number;
  carImage: CarImage;
  isFavorite: boolean;
  recommended: boolean;
  description: string;
  sellerNote: string;
  basePrice: number;
  retailPrice: number;
  engineVolume: number;
  engineDescription: string;

}
