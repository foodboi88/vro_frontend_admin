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
    bankName: string,
    bankAccountNumber: string,
    
}

export interface IGetWithdrawsRequest {
    size: number;
    offset: number;
    search?: string;
    startTime?: string;
    endTime?: string;
    status?: string
    sortBy?: string
    sortOrder?: string;
}