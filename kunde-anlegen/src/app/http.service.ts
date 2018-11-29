import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private kundeUrl = 'http://localhost:3000/kunde';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public addKunde(kunde): Observable<any> {
    if (kunde.id) {
      return this.http.put(this.kundeUrl + '/' + kunde.id , kunde, this.httpOptions)
        .pipe(catchError(this.handleError));
    } else {
      return this.http.post(this.kundeUrl, kunde, this.httpOptions)
        .pipe(catchError(this.handleError));
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('There was an client error', error.error.message);
    } else {
      console.error('There was an Backend Error');
      console.error('Status code returned', error.status);
    }
    return throwError('There was an error! Retry later');
  }
}
