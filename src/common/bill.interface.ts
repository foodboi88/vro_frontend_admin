export interface IGetBillsRequest {
    size: number;
    offset: number;
    search?: string;
    startTime?: string;
    endTime?: string;
    status?: string
    sortBy?: string
    sortOrder?: string;
}
