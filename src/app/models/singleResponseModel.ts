import { ResponseModel } from "./ResponseModel";

export interface SingleResponseModel<T> extends ResponseModel{
    token: string;
    data : T;
}