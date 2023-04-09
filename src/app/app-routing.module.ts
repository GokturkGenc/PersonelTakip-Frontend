import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchUpdateComponent } from './components/branch-update/branch-update.component';
import { BranchComponent } from './components/branch/branch.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskComponent } from './components/task/task.component';
import { UnitAddComponent } from './components/unit-add/unit-add.component';
import { UnitComponent } from './components/unit/unit.component';
import { EmployeeWorkersComponent } from './components/employee-workers/employee-workers.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainPageComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'employees/stillworkers', component: EmployeeWorkersComponent },
  { path: 'employees/unit/:unitId', component: EmployeeComponent },
  { path: 'employees/task/:taskId', component: EmployeeComponent },
  { path: 'employees/branch/:branchId', component: EmployeeComponent },
  { path: 'employees/employee/:employeeId', component: EmployeeDetailComponent },
  { path: 'employees/update/:employeeId', component: EmployeeUpdateComponent },
  { path: 'employees/task/:taskId/unit/:unitId', component: EmployeeComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'units', component: UnitComponent },
  { path: 'branches', component: BranchComponent },
  { path: 'branches/update/:branchId', component: BranchUpdateComponent },
  { path: 'units/add', component: UnitAddComponent },
  { path: 'tasks/add', component: TaskAddComponent },
  { path: 'employees/add', component: EmployeeAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
