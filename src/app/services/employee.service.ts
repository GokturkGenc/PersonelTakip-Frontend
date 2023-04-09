import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeDetail } from '../models/employeeDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl = 'https://localhost:44323/api/employees/';
  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<ListResponseModel<EmployeeDetail>> {
    let newPath = this.apiUrl + 'getemployeedetails';
    return this.httpClient.get<ListResponseModel<EmployeeDetail>>(newPath);
  }

  add(employee:Employee):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+ 'add',employee)
  }

  delete(employee:Employee):Observable<ResponseModel>{
    let newPath = this.apiUrl + "delete"
    return this.httpClient.request<ResponseModel>("DELETE",newPath,{body: employee})
  }

  update(employee:Employee):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrl+'update',employee)
  }

  getEmployeeDetailsById(employeeId:number): Observable<SingleResponseModel<EmployeeDetail>>{
    let newPath = this.apiUrl +'getemployeedetail?employeeId='+ employeeId;
    return this.httpClient.get<SingleResponseModel<EmployeeDetail>>(newPath)
  }

  getEmployeesByUnit(unitId: number): Observable<ListResponseModel<EmployeeDetail>> {
    let newPath = this.apiUrl + 'getbyunit?unitId=' + unitId;
    return this.httpClient.get<ListResponseModel<EmployeeDetail>>(newPath);
  }

  getEmployeesByTask(taskId: number): Observable<ListResponseModel<EmployeeDetail>> {
    let newPath = this.apiUrl + 'getbytask?taskId=' + taskId;
    return this.httpClient.get<ListResponseModel<EmployeeDetail>>(newPath);
  }

  getEmployeesByBranch(branchId: number): Observable<ListResponseModel<EmployeeDetail>> {
    let newPath = this.apiUrl + 'getbybranch?branchId=' + branchId;
    return this.httpClient.get<ListResponseModel<EmployeeDetail>>(newPath);
  }

  getEmployeesByTaskAndUnit(taskId:number,unitId:number){
    let newPath=this.apiUrl + "getemployeesbyunitandtask?unitId="+unitId+ "&taskId=" +taskId;
    return this.httpClient.get<ListResponseModel<EmployeeDetail>>(newPath);
  }

  getStillWorkers() : Observable<ListResponseModel<EmployeeDetail>>{
    let newPath = this.apiUrl + "getworkers"
    return this.httpClient.get<ListResponseModel<EmployeeDetail>>(newPath);
  }

}