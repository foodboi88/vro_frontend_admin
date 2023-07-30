import { ISellerRequest } from "./user.interface";

export interface ISketch {
    title: string,
    price: number,
    views: number,
    likes: number,
    quantityPurchased: number,
    createdAt: string,
    updatedAt: string,
    id: string,
    image: string,
    nameDesignStyle: string
    seller?: ISellerRequest
}

export interface IGetSketchRequest{
    size: number;
    offset: number;
    search?: string;
    startTime?: string;
    endTime?: string;
    status?: string
    sortBy?: string
    sortOrder?: string;
    typeId?: string
}

export interface IStatisticSketch{
    totalProduct: number;
    totalProductNew: number;
}
export interface ITool {
    name: string;
    description: string;
    id: string;
}

export interface IReqGetLatestSketchs {
    size: number;
    offset: number;
}
