import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

import { catchError } from 'rxjs/operators';
import { LocationService } from '../locations/location.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private location: LocationService
  ) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  private getHeaders() {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return headers;
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return this.http.get(`${environment.apiEndpoint}${path}`, { headers, params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: any = {}): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(
      `${environment.apiEndpoint}${path}`,
      body, { headers }
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: any = {}): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      `${environment.apiEndpoint}${path}`,
      body, { headers }
    ).pipe(catchError(this.formatErrors));
  }

  httpPost(path: string, body: any = {}): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      `${environment.apiEndpoint}${path}`,
      body, { headers }
    );
  }

  delete(path: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.delete(
      `${environment.apiEndpoint}${path}`, { headers }
    ).pipe(catchError(this.formatErrors));
  }
}
