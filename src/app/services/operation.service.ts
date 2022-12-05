import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/ResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserOperationClaim } from '../models/userOperationClaim';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  apiUrl="https://localhost:44323/api/"
  userOp ="useroperations/"
  operation ="operations/"
    constructor(private httpClient:HttpClient) { }


    getOperations(): Observable<ListResponseModel<OperationClaim>> {
      let newPath = this.apiUrl + this.operation +'getoperations';
      return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
    }

    addOperation(operation:OperationClaim):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+ this.operation + 'add',operation)
    }
  
    deleteOperation(operation:OperationClaim):Observable<ResponseModel>{
      let newPath = this.apiUrl + this.operation + "delete"
      return this.httpClient.request<ResponseModel>("DELETE",newPath,{body: operation})
    }
  
    updateOperation(operation:OperationClaim):Observable<ResponseModel>{
      let newPath = this.apiUrl + this.operation + "update"
      return this.httpClient.put<ResponseModel>(newPath,operation)
    }

                ///////////////////////////////////////////

    getUserOperations():Observable<ListResponseModel<UserOperationClaim>>{
      let newPath = this.apiUrl +this.userOp + "getall"
      return this.httpClient.get<ListResponseModel<UserOperationClaim>>(newPath);
    }

    addUserOperation(userOp:UserOperationClaim):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+ this.userOp + 'add',userOp)
    }
  
    deleteuserOperation(userOp:UserOperationClaim):Observable<ResponseModel>{
      let newPath = this.apiUrl + this.userOp + "delete"
      return this.httpClient.request<ResponseModel>("DELETE",newPath,{body: userOp})
    }
  
    updateUserOperation(userOp:UserOperationClaim):Observable<ResponseModel>{
      let newPath = this.apiUrl + this.userOp + "update"
      return this.httpClient.put<ResponseModel>(newPath,userOp)
    }

    getOperationsByUser(userId: number): Observable<ListResponseModel<UserOperationClaim>> {
      let newPath = this.apiUrl + this.userOp+ 'getoperationsbyuserid?userid=' + userId;
      return this.httpClient.get<ListResponseModel<UserOperationClaim>>(newPath);
    }
}
