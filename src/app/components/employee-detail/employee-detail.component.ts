import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDetail } from 'src/app/models/employeeDetail';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: EmployeeDetail;

  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['employeeId']) {
        this.getEmployeeDetailsById(params['employeeId']);
      }
    });
  }

  getEmployeeDetailsById(employeeId: number) {
    this.employeeService.getEmployeeDetailsById(employeeId).subscribe((response) => {
      this.employee = response.data;
    });
  }
}
