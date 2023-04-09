import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Unit } from 'src/app/models/unit';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  units: Unit[] = [];
  currentUnit:Unit;
  unitAddForm: FormGroup

  constructor(private unitService: UnitService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getUnits();
    this.createUnitAddForm();
  }

  getUnits() {
    this.unitService.getUnits().subscribe(response => {
      this.units = response.data
      this.units.sort((a,b)=>a.unitName<b.unitName? -1:a.unitName>b.unitName?1:0)
    })
  }

  createUnitAddForm() {
    this.unitAddForm = this.formBuilder.group({
      unitName: ["", Validators.required],
    })
  }

  addUnit() {
    if (this.unitAddForm.valid) {
      let unitModel = Object.assign({}, this.unitAddForm.value)
      this.unitService.add(unitModel).subscribe(response => {
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
  

  setCurrentUnit(unit:Unit){
    this.currentUnit = unit;
  }

  getCurrentUnitClass(unit:Unit){
    if(unit ==this.currentUnit){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}