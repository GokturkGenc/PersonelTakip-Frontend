import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  apiUrl = "https://localhost:44323/api/branches/"
  constructor(private httpClient:HttpClient) { }

  add(branch:Branch):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+ 'add',branch)
  }
  update(branch:Branch):Observable<ResponseModel>{
    let newPath = this.apiUrl + "update"
    return this.httpClient.put<ResponseModel>(newPath,branch)
  }

  getBranches() : Observable<ListResponseModel<Branch>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<Branch>>(newPath);
  }

}