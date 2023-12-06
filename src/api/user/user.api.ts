import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";

export default class UserApi {
    static apiURL = API_URL;

    static getAllUsers(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        console.log(queryParam)
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.GET_ALL_USERS}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getUsersStatistic(): Observable<any> {
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.USER_STATISTIC}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static blockUser(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        console.log(queryParam)
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.BLOCK_USER}${queryParam}`;
        return HttpClient.put(api,body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getAllSellerRequest(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        console.log(queryParam)
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.SELLER_REQUEST}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
    
    static approveSellerRequest(body: any): Observable<any> {
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.SELLER_APPROVE}${body.id}`;
        return HttpClient.put(api,body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getBillList(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        console.log(queryParam)
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.GET_BILLS}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getDetailBill(id: string): Observable<any> {
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.DETAIL_BILL}${id}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getTopArchitect(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        console.log(queryParam)
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.GET_TOP_ARCHITECT}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getOutTopArchitect(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        console.log(queryParam)
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.GET_OUT_TOP_ARCHITECT}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
