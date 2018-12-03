import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const CUSTOMER_URL = 'http://localhost:3000/customer';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getContacts(search?: string): Observable<Customer[]> {
    const url = search ? CUSTOMER_URL + '?q=' + search : CUSTOMER_URL;
    return this.http.get<Customer[]>(url);
  }
}
