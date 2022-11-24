import { CarImage } from './carImage';

export interface CarDetail {
  carId: number;
  brandId: number;
  colorId: number;
  imagePath: CarImage[];
  carName: string;
  brandName: string;
  colorName: string;
  description: string;
  modelYear?: Date;
  dailyPrice: number;
}
