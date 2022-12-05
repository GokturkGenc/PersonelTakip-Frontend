import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId/brand/:brandId', component: CarComponent },
  { path: 'cars/car/:carId', component: CarDetailComponent },
  { path: 'cars/update/:carId', component: CarUpdateComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'colors/add', component: ColorAddComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'users/register', component: RegisterComponent },
  { path: 'users/login', component: LoginComponent },
  { path: 'cars/rentaladd', component: RentalAddComponent },
  { path: 'cars/payment/car/:carId', component: PaymentComponent },
  { path: 'user/profile/:userId', component: UserDetailComponent },
  { path: 'brands/list', component: BrandListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
