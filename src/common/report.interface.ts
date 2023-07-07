export interface IReport{
    status: number,
    describe: string,
    createdAt: string,
    updatedAt: string,
    id: string,
    userName: string,
    userRole: string
}

export interface IStatisticReport{
    totalReport: number,
    totalReportNew: number,
    totalReportProcessed: number,
    TotalNoProcess: number
}