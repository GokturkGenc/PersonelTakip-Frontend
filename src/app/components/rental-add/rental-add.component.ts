import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { RentalDetails } from 'src/app/models/rentalDetail';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;
  car: CarDetail;
  rental: RentalDetails;
  minDate = new Date();
  rentalModel: Rental;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //console.log(this.rentalModel)
    this.createRentalAddForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailByCarId(params['carId']);
      }
    });
  }

  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.car = response.data;
    });
  }

  getDatesInRange(startDate:any, endDate:any) {
    const date = new Date(startDate.getTime());
    const dates = [];  
    while (date <= endDate) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      //carId: ['', Validators.required],
      //customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  getRentDatesByCar() {
    this.rentalService.getRentalDetailByCarId(this.car.carId).subscribe((response) => {
      const countOfRent = response.data.length
      console.log(countOfRent)
      //console.log(this.rentalAddForm.value.rentDate)
      if (countOfRent > 0) {
        for (let i = 0; i < countOfRent; i++) {
          let rentDate1 = new Date(response.data[i].rentDate)
          let returnDate1 = new Date(response.data[i].returnDate)
          let rntDate = this.rentalAddForm.value.rentDate
          let rtrnDate = this.rentalAddForm.value.returnDate
          /////////
          if((this.getDatesInRange(this.rentalAddForm.value.rentDate,this.rentalAddForm.value.returnDate).includes(this.getDatesInRange(rentDate1,rentDate1)[i])
           ||this.getDatesInRange(this.rentalAddForm.value.rentDate,this.rentalAddForm.value.returnDate).includes(this.getDatesInRange(rentDate1,returnDate1)[i]))
          )
          { 
            console.log("range içerisi  " + this.getDatesInRange(rentDate1,returnDate1))
            console.log("benim tarihler  " + this.getDatesInRange(this.rentalAddForm.value.rentDate,this.rentalAddForm.value.returnDate))
            console.log("içeriyor") //// hata ver, belirlenen aralıklarda kiralanmış bilgisi söyle
          } if(this.getDatesInRange(rentDate1,returnDate1).includes(rntDate.getTime())
          ||this.getDatesInRange(rentDate1,returnDate1).includes(rtrnDate.getTime())) {
            console.log("range içerisi  " + this.getDatesInRange(rentDate1,returnDate1))
            console.log("benim tarihler  " + this.getDatesInRange(this.rentalAddForm.value.rentDate,this.rentalAddForm.value.returnDate))
            console.log("İÇERMİYOR !!!!!!") 
            //this.rentTheCar() 
          } else {
            for (let i =0;i<countOfRent;i++){
              console.log("else in içerisi")
              if(i = countOfRent){  /////// burası çözülecek
                this.rentTheCar() 
              }
              
            }
            
          }
          /////////
          // const rentDates = [rentDate1, returnDate1]
          // console.log(rentDates)
        }
      }
    });
  }

  rentTheCar(){
    if(this.rentalAddForm.valid){
      this.toastrService.success('Başarılı');
      this.sendData();
      this.router.navigate(["cars/payment/car/", this.car.carId])
    }
  }
  

  isCarRented() {
    if (this.rentalAddForm.valid) {
      this.rentalService.isCarRented(this.car.carId).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.sendData();
        this.router.navigate(["cars/payment/car/", this.car.carId])
      },
        (responseError) => {
          this.toastrService.error(responseError.error)
        }
      );
    }
  }

  sendData() {
    this.rentalModel = Object.assign({}, this.rentalAddForm.value);// buradan aldığım veriyi başka componentlarda da kullanmak için bu servisi yazdık
    //console.log(this.modelOfRental)
    this.paymentService.updateData(this.rentalModel)
  }
}
