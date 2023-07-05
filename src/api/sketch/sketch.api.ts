import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";

export default class SketchApi {
    static apiURL = API_URL;

    static getAllSketchs(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        console.log(queryParam)
        const api = `${SketchApi.apiURL.HOST}/${this.apiURL.GET_SKETCHS}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getSketchStatistic(): Observable<any> {
        const api = `${SketchApi.apiURL.HOST}/${this.apiURL.STATISTIC_SKETCH}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // static blockUser(body: any): Observable<any> {
    //     const queryParam = Utils.parseObjectToQueryParameter(body);
    //     console.log(queryParam)
    //     const api = `${UserApi.apiURL.HOST}/${this.apiURL.BLOCK_USER}${queryParam}`;
    //     return HttpClient.put(api,body).pipe(
    //         map(
    //             (res) => (res as any) || null,
    //             catchError((error) => new Observable())
    //         )
    //     );
    // }
    
}
