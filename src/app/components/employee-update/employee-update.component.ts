import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/models/branch';
import { Employee } from 'src/app/models/employee';
import { EmployeeDetail } from 'src/app/models/employeeDetail';
import { Task } from 'src/app/models/task';
import { Unit } from 'src/app/models/unit';
import { BranchService } from 'src/app/services/branch.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskService } from 'src/app/services/task.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  employeeUpdateForm: FormGroup;
  tasks: Task[];
  units: Unit[];
  branches: Branch[];
  employees: EmployeeDetail[];
  employee: EmployeeDetail;

  firstName: string = "denemedeneme"


  constructor(private formBuilder: FormBuilder,
    private taskService: TaskService,
    private unitService: UnitService,
    private employeeService: EmployeeService,
    private branchService: BranchService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['employeeId']) {
        this.getEmployeeDetailsById(params['employeeId']);
      }
    });
    this.getTasks()
    this.getUnits()
    this.getBranches()
    this.createUpdateForm()

  }


  createUpdateForm() {
    this.employeeUpdateForm = this.formBuilder.group({
      employeeId: ["", Validators.required],
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

  getEmployeeDetailsById(employeeId: number) {
    this.employeeService.getEmployeeDetailsById(employeeId).subscribe((response) => {
      this.employee = response.data;
    });
  }

  getTasks() {
    this.taskService.getTasks().subscribe(response => {
      this.tasks = response.data
      this.tasks.sort((a, b) => a.taskName < b.taskName ? -1 : a.taskName > b.taskName ? 1 : 0)
    })
  }

  getUnits() {
    this.unitService.getUnits().subscribe(response => {
      this.units = response.data
      this.units.sort((a, b) => a.unitName < b.unitName ? -1 : a.unitName > b.unitName ? 1 : 0)
    })
  }

  getBranches() {
    this.branchService.getBranches().subscribe(response => {
      this.branches = response.data
      this.branches.sort((a, b) => a.branchCityName < b.branchCityName ? -1 : a.branchCityName > b.branchCityName ? 1 : 0)
    })
  }

  update() {
    console.log(this.employeeUpdateForm.value)
    if (this.employeeUpdateForm.valid) {
      let employeeModel = Object.assign({}, this.employeeUpdateForm.value)
      employeeModel.employeeId = this.employee.employeeId
      this.employeeService.update(employeeModel).subscribe(response => {
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
