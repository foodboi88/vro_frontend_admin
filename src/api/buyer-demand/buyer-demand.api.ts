import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enums/api.enums";
import Utils from "../../utils/base-utils";
import HttpClient from "../http-client";

export default class BuyerDemandAPI {
  static apiURL = API_URL;

  static getUploadDemand(body: any): Observable<any> {
    const queryParam = Utils.parseObjectToQueryParameter(body);
    const api = `${BuyerDemandAPI.apiURL.HOST}/${this.apiURL.CUSTOMER_NEED}${queryParam}`;
    return HttpClient.get(api).pipe(
      map(
        (res) => (res as any) || null,
        catchError((error) => new Observable())
      )
    );
  }

  static approveDemand(id: string): Observable<any> {
    const api = `${BuyerDemandAPI.apiURL.HOST}/${this.apiURL.APPROVE_UPLOAD_CUSTOMER_NEED}?id=${id}`;
    return HttpClient.patch(api).pipe(
      map(
        (res) => (res as any) || null,
        catchError((error) => new Observable())
      )
    );
  }

  // static getBannerHomepageData(body: any): Observable<any> {
  //   const api = `${BuyerDemandAPI.apiURL.HOST}/${this.apiURL.BANNER_HOME_PAGE_DATA}`;
  //   return HttpClient.get(api).pipe(
  //     map(
  //       (res) => (res as any) || null,
  //       catchError((error) => new Observable())
  //     )
  //   );
  // }

  // static saveBannerHomepageData(body: any, id: string): Observable<any> {
  //   const api = `${BuyerDemandAPI.apiURL.HOST}/${this.apiURL.BANNER_HOME_PAGE_DATA}/${id}`;
  //   return HttpClient.put(api, body).pipe(
  //     map(
  //       (res) => (res as any) || null,
  //       catchError((error) => new Observable())
  //     )
  //   );
  // }
}
