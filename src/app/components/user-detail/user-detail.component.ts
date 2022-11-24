import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user:UserModel = this.authService.getUserInfo()

  constructor(private authService:AuthService,
    private userService:UserService    
    ) { }

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails(){
    this.userService.getUserById(this.authService.user.userId).subscribe((response) => {
      this.user = response.data;
    });
  }


}
