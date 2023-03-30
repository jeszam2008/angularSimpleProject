import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../interfaces/APIResponse';
import { Supplier } from '../interfaces/Supplier';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private API_BASE_URL : string = environment.apiURL;

  constructor(private http: HttpClient) { }

  getSuppliers(keyword? : string): Observable<Supplier[]> {
    const httpHeaderConfig = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let httpParams = new HttpParams();

    if (keyword) {
      httpParams = httpParams.append('searchKeyword', keyword);
    }

    return this.http.get<Supplier[]>(this.API_BASE_URL + '/suppliers', { headers: httpHeaderConfig, params: httpParams}).pipe(  
      map((result: any) => result.data) 
    );
    
  }
}
