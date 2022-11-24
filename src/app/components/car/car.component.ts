import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/carImage.service';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  carImages: CarImage[] = [];
  brandFilter : number = 0;
  colorFilter : number = 0;
  imageUrl = 'https://localhost:44323/uploads/images/';
  filterText="";
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private toastrService:ToastrService,
  ) {}

  ngOnInit(): void {
    this.getBrands()
    this.getColors()
    this.activatedRoute.params.subscribe((params) => {
      if(params['brandId'] & params['colorId']){
        this.getCarsByColorAndBrand(params['colorId'],params['brandId'])
      }
      else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }
  
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByColorAndBrand(colorId:number,brandId:number){
    this.carService.getCarsByColorAndBrand(colorId,brandId).subscribe((response) =>{
      this.cars = response.data;
    });
  }

  // image(carId: number) {
  //   this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
  //     const imagePath = response.data[0].imagePath;
  //     let imageOfPath = this.imageUrl + imagePath;
  //     console.log(imageOfPath);
  //   });
  // }
}
