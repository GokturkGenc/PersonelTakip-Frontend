import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Unit } from 'src/app/models/unit';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-unit-update',
  templateUrl: './unit-update.component.html',
  styleUrls: ['./unit-update.component.css']
})
export class UnitUpdateComponent implements OnInit {
  unitUpdateForm: FormGroup
  units:Unit[] = [];
  unit:Unit
  constructor(private unitService:UnitService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getUnits()
    this.createUnitUpdateForm()
  }

  createUnitUpdateForm(){
    this.unitUpdateForm = this.formBuilder.group({
      unitId: ["",Validators.required],
      unitName: ["",Validators.required],
    })
  }
  
  update(){
    if(this.unitUpdateForm.valid){
      let unitModel:Unit = Object.assign({},this.unitUpdateForm.getRawValue())
      let newName:string = unitModel.unitName
      newName = newName[0].toUpperCase() + newName.slice(1)
      unitModel.unitName = newName
      this.unitService.update(unitModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(function(){
          location.reload()
        },400)
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for(let i = 0;i < responseError.error.ValidationErrors.length;i++){
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      })
      
    }else{
      this.toastrService.error("Formu doldurmanız gerekli","Hata")
    }
  }

  getUnits() {
    this.unitService.getUnits().subscribe(response => {
      this.units = response.data
      this.units.sort((a,b)=>a.unitName<b.unitName? -1:a.unitName>b.unitName?1:0)
    })
  }

}