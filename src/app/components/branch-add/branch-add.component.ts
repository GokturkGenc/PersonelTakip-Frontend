import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-branch-add',
  templateUrl: './branch-add.component.html',
  styleUrls: ['./branch-add.component.css']
})
export class BranchAddComponent implements OnInit {
  branchAddForm: FormGroup
  constructor(private formBuilder: FormBuilder,
    private branchService: BranchService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createBranchAddForm();
  }

  createBranchAddForm() {
    this.branchAddForm = this.formBuilder.group({
      branchName: ["", Validators.required],
    })
  }

  add() {
    if (this.branchAddForm.valid) {
      let branchModel = Object.assign({}, this.branchAddForm.value);
      let newName:string = branchModel.branchName
      newName = newName[0].toUpperCase() + newName.slice(1)
      branchModel.branchName = newName
      this.branchService.add(branchModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
      }, (responseError) => {
            this.toastrService.error(responseError.error.Errors,'Branch name already exist');
      }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

}