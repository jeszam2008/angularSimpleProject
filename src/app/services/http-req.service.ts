import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../interfaces/APIResponse';
import { Customer } from '../interfaces/Customer';


@Injectable({
  providedIn: 'root'
})
export class HttpReqService {
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
}
