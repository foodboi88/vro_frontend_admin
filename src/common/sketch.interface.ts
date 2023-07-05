
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
}

export interface IGetSketchRequest{
    size: number;
    offset: number;
    search?: string;
    startTime?: string;
    endTime?: string;
    status?: string
    sortBy?: string
    sortOrder?: string
}