import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";

export default class StatisticAPI {
    static apiURL = API_URL;

    // Lấy ra thống kê tổng quan về tổng doanh thu, số lượng đơn hàng, số lượng sản phẩm, số lượng người dùng của cửa hàng
    static getOverViewStatistic(): Observable<any> {
        const api = `${StatisticAPI.apiURL.HOST}/${this.apiURL.OVERVIEW_STATISTIC}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}
