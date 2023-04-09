import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDetail } from 'src/app/models/employeeDetail';
import { Task } from 'src/app/models/task';
import { Unit } from 'src/app/models/unit';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskService } from 'src/app/services/task.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  employees: EmployeeDetail[] = [];
  tasks: Task[] = [];
  units: Unit[] = [];
  taskFilter : number = 0;
  unitFilter : number = 0;

  constructor(    private employeeService: EmployeeService,
    private taskService: TaskService,
    private unitService: UnitService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.getUnits()
    this.getTasks()
    this.activatedRoute.params.subscribe((params) => {
      if(params['taskId'] & params['unitId']){
        this.getEmployeesByTaskAndUnit(params['taskId'],params['unitId'])
      }
      else if (params['unitId']) {
        this.getEmployeesByTask(params['unitId']);
      } else if (params['taskId']) {
        this.getEmployeesByUnit(params['taskId']);
      } else {
        this.getEmployees()
      }
    });
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((response) => {
      this.employees = response.data;
    });
  }


  getTasks() {
    this.taskService.getTasks().subscribe(response => {
      this.tasks = response.data
      this.tasks.sort((a,b)=>a.taskName<b.taskName? -1:a.taskName>b.taskName?1:0)
    })
  }
  getUnits(){
    this.unitService.getUnits().subscribe(response => {
      this.units = response.data
      this.units.sort((a,b)=>a.unitName<b.unitName? -1:a.unitName>b.unitName?1:0)
    })
  }
  
  getEmployeesByUnit(unitId: number) {
    this.employeeService.getEmployeesByUnit(unitId).subscribe((response) => {
      this.employees = response.data;
    });
  }

  getEmployeesByTask(taskId: number) {
    this.employeeService.getEmployeesByTask(taskId).subscribe((response) => {
      this.employees = response.data;
    });
  }


  getEmployeesByTaskAndUnit(unitId:number,taskId:number){
    this.employeeService.getEmployeesByTaskAndUnit(unitId,taskId).subscribe((response) =>{
      this.employees = response.data;
    });
  }

}
