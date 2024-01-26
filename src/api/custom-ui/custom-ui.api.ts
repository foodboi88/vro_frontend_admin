import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import HttpClient from "../http-client";

export default class CustomUIAPI {
  static apiURL = API_URL;

  static getMissionPageData(body: any): Observable<any> {
    const api = `${CustomUIAPI.apiURL.HOST}/${this.apiURL.MISSION_PAGE_DATA}`;
    return HttpClient.get(api).pipe(
      map(
        (res) => (res as any) || null,
        catchError((error) => new Observable())
      )
    );
  }

  static saveMissionPageData(body: any, id: string): Observable<any> {
    const api = `${CustomUIAPI.apiURL.HOST}/${this.apiURL.MISSION_PAGE_DATA}/${id}`;
    return HttpClient.put(api, body).pipe(
      map(
        (res) => (res as any) || null,
        catchError((error) => new Observable())
      )
    );
  }

  static getBannerHomepageData(body: any): Observable<any> {
    const api = `${CustomUIAPI.apiURL.HOST}/${this.apiURL.BANNER_HOME_PAGE_DATA}`;
    return HttpClient.get(api).pipe(
      map(
        (res) => (res as any) || null,
        catchError((error) => new Observable())
      )
    );
  }

  static saveBannerHomepageData(body: any, id: string): Observable<any> {
    const api = `${CustomUIAPI.apiURL.HOST}/${this.apiURL.BANNER_HOME_PAGE_DATA}/${id}`;
    return HttpClient.put(api, body).pipe(
      map(
        (res) => (res as any) || null,
        catchError((error) => new Observable())
      )
    );
  }
}
