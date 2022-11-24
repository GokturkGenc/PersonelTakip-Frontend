import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/ResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = "https://localhost:44323/api/"
  private dataSource = new ReplaySubject<Rental>(1)
  currentData = this.dataSource.asObservable();

  constructor(private httpClient:HttpClient) { }
  updateData(data:Rental){
    this.dataSource.next(data);
  }
  
  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"rentals/add",rental)
  }

  checkMoneyExist(userId:number):Observable<SingleResponseModel<Payment>>{
    let newPath = this.apiUrl + 'payment/getdetailbyuserid?userId='+ userId
    return this.httpClient.get<SingleResponseModel<Payment>>(newPath)
  }

  totalPrice(totalAmountInfo:any):Observable<any>{
    let newPath=this.apiUrl+"rentals/totalprice"
    return this.httpClient.get<any>(newPath,totalAmountInfo)
  }
}
