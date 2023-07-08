import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";

export default class WithdrawApi {
    static apiURL = API_URL;

    static getAllWithdrawRequests(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        console.log(queryParam)
        const api = `${WithdrawApi.apiURL.HOST}/${this.apiURL.WITHDRAW_REQUEST}admin${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static approveWithdrawRequest(body: any): Observable<any> {
        const api = `${WithdrawApi.apiURL.HOST}/${this.apiURL.WITHDRAW_REQUEST}${body.id}/approve`;
        return HttpClient.put(api,body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

   
}
