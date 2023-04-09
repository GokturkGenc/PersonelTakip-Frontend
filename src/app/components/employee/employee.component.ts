import { Component, OnInit } from '@angular/core';
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
  selector: 'app-employee',
  templateUrl:'./employee.component.html',
  template:  '<td>{{employee.birthDate|dateShortenerPipe}}</td>',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: EmployeeDetail[] = [];
  tasks: Task[] = [];
  units: Unit[] = [];
  branches : Branch[] = [];
  taskFilter : number = 0;
  unitFilter : number = 0;
  dataLoaded = false;

  constructor(
    private employeeService: EmployeeService,
    private branchService: BranchService,
    private taskService: TaskService,
    private unitService: UnitService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
  ) {}

  ngOnInit(): void {
    this.getBranches()
    this.getTasks()
    this.getUnits()
    this.activatedRoute.params.subscribe((params) => {
      if(params['taskId'] & params['unitId']){
        this.getEmployeesByTaskAndUnit(params['taskId'],params['unitId'])
      }
      else if (params['unitId']) {
        this.getEmployeesByUnit(params['unitId']);
      } else if (params['taskId']) {
        this.getEmployeesByTask(params['taskId']);
      } else {
        this.getEmployees();
      }
    });
    }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((response) => {
      this.employees = response.data;
    });
  }
  getBranches() {
    this.branchService.getBranches().subscribe(response => {
      this.branches = response.data
      this.branches.sort((a,b)=>a.branchCityName<b.branchCityName? -1:a.branchCityName>b.branchCityName?1:0)
    })
  }
  getTasks(){
    this.taskService.getTasks().subscribe(response => {
      this.tasks = response.data
      this.tasks.sort((a,b)=>a.taskName<b.taskName? -1:a.taskName>b.taskName?1:0)
    })
  }

  getUnits() {
    this.unitService.getUnits().subscribe(response => {
      this.units = response.data
      this.units.sort((a,b)=>a.unitName<b.unitName? -1:a.unitName>b.unitName?1:0)
    })
  }
  
  getEmployeesByTask(taskId: number) {
    this.employeeService.getEmployeesByTask(taskId).subscribe((response) => {
      this.employees = response.data;
    });
  }

  getEmployeesByBranch(branchId: number) {
    this.employeeService.getEmployeesByBranch(branchId).subscribe((response) => {
      this.employees = response.data;
    });
  }

  getEmployeesByUnit(unitId: number) {
    this.employeeService.getEmployeesByUnit(unitId).subscribe((response) => {
      this.employees = response.data;
    });
  }

  getEmployeesByTaskAndUnit(taskId:number,unitId:number){
    this.employeeService.getEmployeesByTaskAndUnit(taskId,unitId).subscribe((response) =>{
      this.employees = response.data;
    });
  }

  getStillWorkers(){
    this.employeeService.getStillWorkers().subscribe((response) => {
      this.employees = response.data;
    });
  }
}