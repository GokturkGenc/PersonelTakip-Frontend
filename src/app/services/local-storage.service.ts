import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getToken():any{
    return localStorage.getItem('token')
  }

  removeToken(){
    localStorage.removeItem('token');
  }

  saveToken(token:string){
    return localStorage.setItem('token',token)
  }
}
