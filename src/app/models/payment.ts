export interface Payment{
    paymentId:number,
    userId:number,
    creditCardNumber:string,
    price:number,
    expirationDate:string,
    securityNumber:string
}