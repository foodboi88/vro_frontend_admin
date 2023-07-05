export interface IOverViewStatictis {
    totalRevenue: number;
    totalOrder: number;
    totalSeller: number;
    totalUser: number;
}

export interface IOverViewStatictisDay {
    total: number;
    statictisDay: IStatictisDay[];
    totalPriceSum: number;
    totalPriceSellerSum: number;
    totalPriceOwnSum: number;
    totalPriceIncomeSum: number;
}

export interface IStatictisDay {
    id: string,
    totalPrice: number,
    totalPriceSeller: number,
    totalPriceOwn: number,
    totalPriceIncome: number,
    day: string,
    createdAt: string,
    updatedAt: string
}