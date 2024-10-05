import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../../Constants/AppConstants';

@Injectable({
  providedIn: 'root'
})
export class BaseAPIService {
  private readonly baseUrl = AppConstants.baseURL;
  private genericError = "";
  httpClient = inject(HttpClient);

  constructor() {
    this.genericError = `Some Error occcured, Please contact Administrator for the Errors`;
  }

  //get
  get(endpoint: string): Observable<any> {
    var finalUrl = `${this.baseUrl}/${endpoint}`;
    let response = this.httpClient.get<any>(finalUrl);
    return response;
  }

  //post
  post(endpoint: string, body: object): Observable<any> {
    var finalUrl = `${this.baseUrl}/${endpoint}`;
    let response = this.httpClient.post<any>(finalUrl, body);

    return response;
  }

  //put
  put(endpoint: string, body: object): Observable<any> {
    var finalUrl = `${this.baseUrl}/${endpoint}`;
    let response = this.httpClient.put<any>(finalUrl, body);

    return response;
  }

  //delete
  delete(endpoint: string): Observable<any> {
    var finalUrl = `${this.baseUrl}/${endpoint}`;
    let response = this.httpClient.delete<any>(finalUrl);

    return response;
  }
}
