import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
  brands: Brand[];
  colors: Color[];
  cars: CarDetail[];
  car: CarDetail;

  constructor(private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    //private config: DynamicDialogConfig,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsById(params['carId']);
      }
    });
    this.getBrands()
    this.getColors()
    this.createUpdateForm()

  }

  createUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: ["", Validators.required],
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      modelYear: ["", Validators.required]
    })
  }

  getCarDetailsById(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.car = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
      this.brands.sort((a,b)=>a.brandName<b.brandName? -1:a.brandName>b.brandName?1:0)
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
      this.colors.sort((a,b)=>a.colorName<b.colorName? -1:a.colorName>b.colorName?1:0)
    })
  }

  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value)
      this.carService.update(carModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
      }, responseError => {
        if (responseError.error.Errors) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası")
          }
        }
      })
    } else {
      this.toastrService.error("Form hatalı", "Dikkat")
    }
  }


}