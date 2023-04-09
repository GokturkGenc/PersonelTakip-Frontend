import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/models/branch';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-branch-update',
  templateUrl: './branch-update.component.html',
  styleUrls: ['./branch-update.component.css']
})
export class BranchUpdateComponent implements OnInit {
  branchUpdateForm: FormGroup
  branches:Branch[] = [];
  branch:Branch
  constructor(private branchService:BranchService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBranches()
    this.createBranchUpdateForm()
  }

  createBranchUpdateForm(){
    this.branchUpdateForm = this.formBuilder.group({
      branchId: ["",Validators.required],
      branchCityName: ["",Validators.required],
    })
  }
  
  update(){
    console.log(this.branchUpdateForm.value)
    if(this.branchUpdateForm.valid){
      let brandModel:Branch = Object.assign({},this.branchUpdateForm.getRawValue())
      let newName:string = brandModel.branchCityName
      newName = newName[0].toUpperCase() + newName.slice(1)
      brandModel.branchCityName = newName
      this.branchService.update(brandModel).subscribe(response=>{
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

  getBranches() {
    this.branchService.getBranches().subscribe(response => {
      this.branches = response.data
      this.branches.sort((a,b)=>a.branchCityName<b.branchCityName? -1:a.branchCityName>b.branchCityName?1:0)
    })
  }

}