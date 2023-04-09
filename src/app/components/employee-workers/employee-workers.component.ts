import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDetail } from 'src/app/models/employeeDetail';
import { BranchService } from 'src/app/services/branch.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskService } from 'src/app/services/task.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-employee-workers',
  templateUrl: './employee-workers.component.html',
  styleUrls: ['./employee-workers.component.css']
})
export class EmployeeWorkersComponent implements OnInit {

  employees: EmployeeDetail[] = [];

  constructor(private employeeService: EmployeeService,
    private branchService: BranchService,
    private taskService: TaskService,
    private unitService: UnitService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.getStillWorkers();
  }

  getStillWorkers(){
    this.employeeService.getStillWorkers().subscribe((response) => {
      this.employees = response.data;
    });
  }
}
