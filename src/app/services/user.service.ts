import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:44323/api/';
  constructor(private httpClient:HttpClient) { }

  add(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+ 'auth/register',user)
  }

  update(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'auth/update',user)
  }

  getUsers(): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getall';
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getUserById(userId:number):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + 'users/getbyid?userid='+userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  getUserByName(firstName:string,lastName:string): Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl +'users/getuserbyname?name='+firstName+lastName;
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }

  getUserByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl +'users/getbyemail?email='+email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }



}
