import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/models/branch';
import { Task } from 'src/app/models/task';
import { Unit } from 'src/app/models/unit';
import { BranchService } from 'src/app/services/branch.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskService } from 'src/app/services/task.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  employeeAddForm: FormGroup
  unitAddForm: FormGroup
  taskAddForm: FormGroup
  branchAddForm: FormGroup
  tasks: Task[] = [];
  units: Unit[] = [];
  branches: Branch[] = [];
  taskSelect: number = 0;
  unitSelect: number = 0;

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private unitService: UnitService,
    private taskService: TaskService,
    private branchService: BranchService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUnits();
    this.getTasks();
    this.getBranches();
    this.createEmployeeAddForm();
    this.createTaskAddForm();
    this.createUnitAddForm();
    this.createBranchAddForm();
  }

  createEmployeeAddForm() {
    this.employeeAddForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      nationalId: ["", Validators.required],
      taskId: ["", Validators.required],
      unitId: ["", Validators.required],
      branchId: ["",Validators.required],
      birthDate:["",Validators.required],
      birthPlace: ["", Validators.required],
      adresses: ["", Validators.required],
      contactNumbers: ["", Validators.required],
      educationStatus: ["", Validators.required],
      dateOfEntry: ["", Validators.required],
      leavingDate:[null,Validators.required]
    })
  }
  createTaskAddForm() {
    this.taskAddForm = this.formBuilder.group({
      taskName: ["", Validators.required],
    })
  }
  createUnitAddForm() {
    this.unitAddForm = this.formBuilder.group({
      unitName: ["", Validators.required],
    })
  }
  createBranchAddForm() {
    this.branchAddForm = this.formBuilder.group({
      branchCityName: ["", Validators.required],
    })
  }

  add() {
    if (!this.employeeAddForm.valid)  {
      let employeeModel = Object.assign({}, this.employeeAddForm.value)
      this.employeeService.add(employeeModel).subscribe(response => {
        this.toastrService.success(response.message, "Personel ekleme başarılı ")
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

  addTask() {
    if (this.taskAddForm.valid) {
      let taskModel = Object.assign({}, this.taskAddForm.value)
      this.taskService.add(taskModel).subscribe(response => {
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
  
  addUnit() {
    if (this.unitAddForm.valid) {
      let unitModel = Object.assign({}, this.unitAddForm.value);
      this.unitService.add(unitModel).subscribe((response) => {
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

  addBranch() {
    if (this.branchAddForm.valid) {
      let branchModel = Object.assign({}, this.branchAddForm.value);
      this.branchService.add(branchModel).subscribe((response) => {
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

  getUnits() {
    this.unitService.getUnits().subscribe(response => {
      this.units = response.data
      this.units.sort((a,b)=>a.unitName<b.unitName? -1:a.unitName>b.unitName?1:0)
    })
  }

  getTasks() {
    this.taskService.getTasks().subscribe(response => {
      this.tasks = response.data
      this.tasks.sort((a,b)=>a.taskName<b.taskName? -1:a.taskName>b.taskName?1:0)
    })
  }

  getBranches() {
    this.branchService.getBranches().subscribe(response => {
      this.branches = response.data
      this.branches.sort((a,b)=>a.branchCityName<b.branchCityName? -1:a.branchCityName>b.branchCityName?1:0)
    })
  }
}
