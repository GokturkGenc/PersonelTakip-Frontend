import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carImage.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  car: CarDetail;
  carimage: CarImage[] = [];

  imageUrl = 'https://localhost:44323/uploads/images/';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsById(params['carId']);
      }
    });
  }

  getCarDetailsById(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.car = response.data;
    });
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
