export interface IUser {
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

export interface IGetUsersRequest {
    size: number;
    offset: number;
    search?: string;
    startTime?: string;
    endTime?: string;
    status?: string
    sortBy?: string
    sortOrder?: string;
    type?: string
}

export interface IStatisticUser {
    totalUser: number,
    totalUserBlock: number
}

export interface ISellerRequest {
    isApproved?: boolean,
    identityCardNumber: string,
    vatCode: string,
    bankAccountNumber: string,
    bankName: string,
    bankBranch: string,
    createdAt: string,
    updatedAt: string,
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    dob: string
}

export interface IBill {
    total: number,
    createdAt: string,
    orderId: string,
    status: boolean,
    id: string,
    userName: string
}

export interface IPriorityUser {
    email: string
    name: string
    phone: string
    createdAt: string
    updatedAt: string
    id: string
    linkImage: string
}

