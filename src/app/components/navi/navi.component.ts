import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  user:UserModel = this.authService.getUserInfo()
  

  constructor(private authService:AuthService, private localStorageService:LocalStorageService,private router:Router,private toastrservice:ToastrService) { }

  ngOnInit(): void {
    this.ngDoCheck()
  }


  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  logout(){
    this.localStorageService.removeToken();
    this.toastrservice.success("başarı ile çıkış yaptınız")
    this.router.navigate([""])

  }

  ngDoCheck(){  
    if(this.user!==this.authService.user){
      this.user = this.authService.user;
    }
  }

}