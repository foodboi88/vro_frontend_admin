export interface IUser{
    id: string,
    email: string,
    name: string,
    phone: string,
    address: string,
    dob: string,
    gender: boolean,
    totalRating: number,
    totalProduct: number,
    createdAt: string,
    updatedAt: string,
    status: string,
    totalSales: number,
    totalBuy: number
}

export interface IGetUsersRequest{
    size: number;
    offset: number;
    search?: string;
    startTime?: string;
    endTime?: string;
    status?: string
    sortBy?: string
    sortOrder?: string
}

