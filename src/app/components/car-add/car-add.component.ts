import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup
  brandAddForm: FormGroup
  colorAddForm: FormGroup
  brands: Brand[] = [];
  colors: Color[] = [];
  brandSelect: number = 0;
  colorSelect: number = 0;

  constructor(private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
    this.createBrandAddForm();
    this.createColorAddForm();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      modelYear: ["", Validators.required],
      //imagePath:["",Validators.required]
    })
  }
  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ["", Validators.required],
    })
  }
  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ["", Validators.required],
    })
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value)
      this.carService.add(carModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası")
          }
        }
      })
    } else {
      this.toastrService.error("Form hatalı", "Dikkat")
    }
  }

  addColor() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response => {
        this.toastrService.success(response.message, "Success")
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i > responseError.error.Errors; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası")
          }
        }
      })
    } else {
      this.toastrService.error("Form hatalı", "Dikkat")
    }
  }
  addBrand() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
      }, (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Doğrulama hatası'
            );
          }
        }
      }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
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

}
