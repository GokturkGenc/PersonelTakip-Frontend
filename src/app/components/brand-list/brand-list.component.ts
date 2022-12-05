import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  brandUpdateForm: FormGroup
  brands: Brand[] = [];
  brand: Brand;
  
  constructor(private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getBrands();
    this.update();
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [this.brand.brandId, Validators.required],
      brandName: ["", Validators.required],
    })
  }

  update() {
    if (this.brandUpdateForm.valid) {
      this.brandUpdateForm.addControl("brandId", new FormControl(this.brandUpdateForm.get("brandId").value.brandId, Validators.required))
      this.brandUpdateForm.addControl("brandName", new FormControl(this.brandUpdateForm.get("brandName").value.brandName, Validators.required))
      let brandModel: Brand = Object.assign({}, this.brandUpdateForm.getRawValue())
      this.brandService.update(brandModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        setTimeout(function () {
          location.reload()
        }, 400)
      }, responseError => {
        if (responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
          }
        }
      })
    } else {
      this.toastrService.error("Formu doldurmanız gerekli", "Hata")
    }
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
      this.brands.sort((a,b)=>a.brandName<b.brandName? -1:a.brandName>b.brandName?1:0)
    })
  }

}
