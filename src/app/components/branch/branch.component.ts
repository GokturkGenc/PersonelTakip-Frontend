import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/models/branch';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  branches: Branch[] = [];
  currentBranch:Branch;
  branchAddForm: FormGroup

  constructor(private branchService: BranchService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getBranches();
    this.createBranchAddForm();
  }

  getBranches() {
    this.branchService.getBranches().subscribe(response => {
      this.branches = response.data
      this.branches.sort((a,b)=>a.branchCityName<b.branchCityName? -1:a.branchCityName>b.branchCityName?1:0)
    })
  }

  createBranchAddForm() {
    this.branchAddForm = this.formBuilder.group({
      branchCityName: ["", Validators.required],
    })
  }

  addBranch() {
    if (this.branchAddForm.valid) {
      let branchModel = Object.assign({}, this.branchAddForm.value)
      this.branchService.add(branchModel).subscribe(response => {
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
  

  setCurrentBranch(branch:Branch){
    this.currentBranch = branch;
  }

  getCurrentBranchClass(branch:Branch){
    if(branch ==this.currentBranch){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}