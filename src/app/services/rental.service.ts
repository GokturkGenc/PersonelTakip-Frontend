import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetails } from '../models/rentalDetail';
import { ResponseModel } from '../models/ResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = "https://localhost:44323/api/rentals/"
  constructor(private httpClient: HttpClient) { }

  add(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', rental)
  }

  getRentals(): Observable<ListResponseModel<RentalDetails>> {
    let newPath = this.apiUrl + "getrentalsdetails"
    return this.httpClient.get<ListResponseModel<RentalDetails>>(newPath);
  }
  isCarRented(carId: number) {
    let newPath = this.apiUrl + "iscarrented?cardId=" + carId;
    return this.httpClient.get<ResponseModel>(newPath);
  }

  ///////////////////////////////
  getRentalDetailByCarId(carId: number): Observable<ListResponseModel<RentalDetails>> {
    let newPath = this.apiUrl + 'getrentalbycarid?carid=' + carId;
    return this.httpClient.get<ListResponseModel<RentalDetails>>(newPath);
  }
}