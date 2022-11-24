import { CarDetail } from "./carDetail";
import { Rental } from "./rental";

export class CartItem{
    car:CarDetail;
    rentDate:Rental;
    returnDate:Rental;
    countOfRentDay:number;
}