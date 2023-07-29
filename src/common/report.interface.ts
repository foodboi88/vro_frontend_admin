export interface IReport {
    total: string,
    createdAt: string,
    orderId: string,
    status: boolean,
    paymentMethods: string,
    id: string,
    totalProduct: number,
    userName: string,

}

export interface IStatisticReport {
    totalReport: number,
    totalReportNew: number,
    totalReportProcessed: number,
    TotalNoProcess: number
}