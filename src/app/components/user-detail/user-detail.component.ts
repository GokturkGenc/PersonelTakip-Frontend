import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserModel } from 'src/app/models/userModel';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { AuthService } from 'src/app/services/auth.service';
import { OperationService } from 'src/app/services/operation.service';
import { UserService } from 'src/app/services/user.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user:UserModel = this.authService.getUserInfo()
  claims : UserOperationClaim [] = []
  constructor(private authService:AuthService,
    private operationService:OperationService,
    private activatedRoute: ActivatedRoute,
    private userService:UserService    
    ) { }

  ngOnInit(): void {
    this.getUserDetails()
    this.activatedRoute.params.subscribe((params) => {
      if (params['userId']) {
        this.getUserClaims(params['userId']);
      }
    });
  }

  // getUserClaims(userId: number) {
  //   this.operationService.getOperationsByUser(userId).subscribe(response => {
  //       this.claims = response.data;
  //   })
  // }

  getUserClaims(userId: number) {
    this.operationService.getOperationsByUser(userId).subscribe((response) => {
      this.claims = response.data;
    });
  }

  getUserDetails(){
    this.userService.getUserById(this.authService.user.userId).subscribe((response) => {
      this.user = response.data
    });
  }


}
