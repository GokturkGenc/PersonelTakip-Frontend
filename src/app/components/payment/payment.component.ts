import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { VatAddedPipe } from 'src/app/pipes/vat-added.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalAmountInfo:number;
  totalAmountWithTaxes:number;
  rentalDay:number;
  modelRental:Rental;
  carId:number;
  rentDate:Date;
  returnDate:Date;

  constructor(
    private paymentService: PaymentService,
    private activetedRoue: ActivatedRoute,
    private toastrService:ToastrService,
    private authService:AuthService,
    private carService:CarService) { }

  ngOnInit(): void {
    this.activetedRoue.params.subscribe((param) => {
      console.log(param['carId']);
      if (param["carId"]) {
        this.carId=Number(param["carId"])
      }});
    
      this.paymentService.currentData.subscribe((data) => {
        console.log('data:', data);
        this.rentDate=data.rentDate;
        this.returnDate=data.returnDate,
        this.totalAmount();
      });
  }

  add(){
    let rental:Rental ={
      rentDate:this.rentDate,
      returnDate:this.returnDate,
      carId:this.carId,
      userId:this.authService.user.userId,
    }
     this.paymentService.add(rental).subscribe(response=>{
      this.toastrService.success(response.message)
      this.toastrService.success("araç kiralandı")
    },
    (responseError)=>{
      this.toastrService.error(responseError.error)
    }) 
  }

  totalAmount(){
    const start = new Date(this.rentDate).getTime();
    const end = new Date(this.returnDate).getTime();
    const diff = end - start;
    const duration=(diff/(1000*60*60*24))
    this.rentalDay=duration;
    this.carService.getCarDetailsById(this.carId).subscribe(response=>{
      const dailyPrice=response.data.dailyPrice
      this.totalAmountInfo=duration*dailyPrice
      this.totalAmountWithTaxes=this.totalAmountInfo + this.totalAmountInfo*18/100
    })
  }
}
