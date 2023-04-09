import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatNativeDateModule } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { TaskComponent } from './components/task/task.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskUpdateComponent } from './components/task-update/task-update.component';
import { UnitComponent } from './components/unit/unit.component';
import { UnitAddComponent } from './components/unit-add/unit-add.component';
import { UnitUpdateComponent } from './components/unit-update/unit-update.component';
import { BranchComponent } from './components/branch/branch.component';
import { BranchAddComponent } from './components/branch-add/branch-add.component';
import { BranchUpdateComponent } from './components/branch-update/branch-update.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NaviComponent } from './components/navi/navi.component';
import { EmployeeWorkersComponent } from './components/employee-workers/employee-workers.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    EmployeeComponent,
    EmployeeAddComponent,
    EmployeeUpdateComponent,
    EmployeeDetailComponent,
    TaskComponent,
    TaskAddComponent,
    TaskUpdateComponent,
    UnitComponent,
    UnitAddComponent,
    UnitUpdateComponent,
    BranchComponent,
    BranchAddComponent,
    BranchUpdateComponent,
    MainPageComponent,
    EmployeeWorkersComponent
  ],
  imports: [BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: "toast-bottom-right" }),
    ReactiveFormsModule,
    JwtModule.forRoot({config: {tokenGetter: tokenGetter, allowedDomains: ["http://localhost:4200/"]},}),
    ////
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatExpansionModule    
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule { }
