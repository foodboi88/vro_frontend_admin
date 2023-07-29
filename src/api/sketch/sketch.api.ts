import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";
import Utils from "../../utils/base-utils";
import { IReqGetLatestSketchs } from "../../common/sketch.interface";

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

    static blockSketch(bodyrequest: any): Observable<any> {
        const api = `${SketchApi.apiURL.HOST}/${this.apiURL.BLOCK_SKETCH}/${bodyrequest.sketchId}`;
        
        return HttpClient.put(api, bodyrequest).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static deleteSketch(bodyrequest: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(bodyrequest);
        console.log(queryParam)
        const api = `${SketchApi.apiURL.HOST}/${this.apiURL.DELETE_SKETCH}${queryParam}`;
        
        return HttpClient.delete(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
    
    static getStyles(params: IReqGetLatestSketchs): Observable<any> {
        const api = `${SketchApi.apiURL.HOST}/${this.apiURL.GET_ALL_STYLE}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
