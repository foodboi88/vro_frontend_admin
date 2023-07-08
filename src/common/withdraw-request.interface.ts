import { ISellerRequest } from "./user.interface";

export interface IWithdrawRequest{
    id: string,
    status: string,
    isProcessed: boolean,
    userId: string,
    sellerId: string,
    amount: number,
    createdAt:string ,
    name: string,
    address: string,
    phone: string,
    email: string,
    sellerType: string,
}