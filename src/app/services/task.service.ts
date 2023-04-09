import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = "https://localhost:44323/api/tasks/"
  constructor(private httpClient:HttpClient) { }

  add(task:Task):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+ 'add',task)
  }
  update(task:Task):Observable<ResponseModel>{
    let newPath = this.apiUrl + "update"
    return this.httpClient.put<ResponseModel>(newPath,task)
  }

  getTasks() : Observable<ListResponseModel<Task>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<Task>>(newPath);
  }

}