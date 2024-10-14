import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../../Constants/AppConstants';

@Injectable({
  providedIn: 'root'
})
export class BaseAPIService {
  private readonly baseUrl = AppConstants.baseURL;
  httpClient = inject(HttpClient);

  constructor() {
  }

  //get
  get(endpoint: string): Observable<any> {
    var finalUrl = `${this.baseUrl}/${endpoint}`;
    let response = this.httpClient.get<any>(finalUrl);

    return response;
  }

  getImageFile(endpoint: string): Observable<Blob> {
    var finalUrl = `${this.baseUrl}/${endpoint}`;
    let response = this.httpClient.get(finalUrl, { responseType: 'blob' });

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

  //Not used
  // import(endpoint: string, file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file, file.name);

  //   var finalUrl = `${this.baseUrl}/${endpoint}`;

  //   return this.httpClient.post(`${finalUrl}`, formData, {
  //     headers: new HttpHeaders({ Accept: 'application/json' }),
  //     responseType: 'text', // Modify response type as needed
  //   });
  // }
}
