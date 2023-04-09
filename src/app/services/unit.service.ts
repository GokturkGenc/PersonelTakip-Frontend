import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';
import { Unit } from '../models/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  apiUrl = "https://localhost:44323/api/units/"
  constructor(private httpClient:HttpClient) { }

  add(unit:Unit):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+ 'add',unit)
  }
  update(unit:Unit):Observable<ResponseModel>{
    let newPath = this.apiUrl + "update"
    return this.httpClient.put<ResponseModel>(newPath,unit)
  }

  getUnits() : Observable<ListResponseModel<Unit>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<Unit>>(newPath);
  }

}