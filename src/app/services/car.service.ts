import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44323/api/cars/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getcardetails';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  // getACar(carId: number): Observable<SingleResponseModel<CarDetail>> {
  //   let newPath = this.apiUrl + 'cars/getcardetail?carId=' + carId;
  //   return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  // }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+ 'add',car)
  }

  delete(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "delete"
    return this.httpClient.request<ResponseModel>("DELETE",newPath,{body: car})
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrl+'update',car)
  }

  getCarDetailsById(carId:number): Observable<SingleResponseModel<CarDetail>>{
    let newPath = this.apiUrl +'getcardetail?carId='+ carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath)
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColorAndBrand(colorId:number,brandId:number){
    let newPath=this.apiUrl + "getcarsbycolorandbrand?colorId="+colorId+ "&brandId=" +brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

}
