import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../interfaces/APIResponse';
import { Customer } from '../interfaces/Customer';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  private API_BASE_URL : string = environment.apiURL;

  constructor(private http: HttpClient) { }

  getCustomers(keyword? : string): Observable<Customer[]> {
    const httpHeaderConfig = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let httpParams = new HttpParams();

    if (keyword) {
      httpParams = httpParams.append('searchKeyword', keyword);
    }

    return this.http.get<Customer[]>(this.API_BASE_URL + '/customers', { headers: httpHeaderConfig, params: httpParams}).pipe(  
      map((result: any) => result.data) 
    );
    
  }

  addCustomer(data : Customer): Observable<APIResponse<Customer>> {
    const httpHeaderConfig = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    return this.http.post<APIResponse<Customer>>(this.API_BASE_URL + '/customers', data, { headers: httpHeaderConfig});

  }

  updateCustomer(data : Customer): Observable<APIResponse<Customer>> {
    const httpHeaderConfig = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    return this.http.put<APIResponse<Customer>>(this.API_BASE_URL + '/customers', data, { headers: httpHeaderConfig});

  }

  removeCustomer(customerID : string): Observable<APIResponse<Customer>> {
    const httpHeaderConfig = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let httpParams = new HttpParams();

    if (customerID) {
      httpParams = httpParams.append('CustomerID', customerID);
    }

    return this.http.delete<APIResponse<Customer>>(this.API_BASE_URL + '/customers', { headers: httpHeaderConfig, params: httpParams});

  }

}
