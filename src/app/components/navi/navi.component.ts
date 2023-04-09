import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  

  constructor(
    private router:Router,
    private toastrservice:ToastrService
    ) { }

  ngOnInit(): void {
    // this.ngDoCheck()
  }


  // isAuthenticated(){
  //   return this.authService.isAuthenticated();
  // }

  // logout(){
  //   this.localStorageService.removeToken();
  //   this.toastrservice.success("başarı ile çıkış yaptınız")
  //   this.router.navigate([""])

  // }

  // ngDoCheck(){  
  //   if(this.user!==this.authService.user){
  //     this.user = this.authService.user;
  //   }
  // }

}