import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44323/api/brands/"
  constructor(private httpClient:HttpClient) { }

  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+ 'add',brand)
  }
  update(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "update"
    return this.httpClient.put<ResponseModel>(newPath,brand)
  }

  getBrands() : Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

}

