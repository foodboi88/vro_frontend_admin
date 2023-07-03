import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";

export default class UserApi {
    static apiURL = API_URL;

    static getAllUsers(body: any): Observable<any> {
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.GET_ALL_USERS}?size=${body.size}&offset=${body.offset}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    
}