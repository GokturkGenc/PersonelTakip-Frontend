import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-unit-add',
  templateUrl: './unit-add.component.html',
  styleUrls: ['./unit-add.component.css']
})
export class UnitAddComponent implements OnInit {
  unitAddForm: FormGroup
  constructor(private formBuilder: FormBuilder,
    private unitService: UnitService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createUnitAddForm();
  }

  createUnitAddForm() {
    this.unitAddForm = this.formBuilder.group({
      unitName: ["", Validators.required],
    })
  }

  add() {
    if (this.unitAddForm.valid) {
      let unitModel = Object.assign({}, this.unitAddForm.value);
      let newName:string = unitModel.unitName
      newName = newName[0].toUpperCase() + newName.slice(1)
      unitModel.unitName = newName
      this.unitService.add(unitModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
      }, (responseError) => {
            this.toastrService.error(responseError.error.Errors,'Unit name already exist');
      }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

}