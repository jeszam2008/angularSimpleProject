import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../interfaces/APIResponse';
import { Shipper } from '../interfaces/Shipper';

@Injectable({
  providedIn: 'root'
})

export class ShipperService {
  private API_BASE_URL : string = environment.apiURL;

  constructor(private http: HttpClient) { }

  getShippers(keyword? : string): Observable<Shipper[]> {
    const httpHeaderConfig = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let httpParams = new HttpParams();

    if (keyword) {
      httpParams = httpParams.append('searchKeyword', keyword);
    }

    return this.http.get<Shipper[]>(this.API_BASE_URL + '/shippers', { headers: httpHeaderConfig, params: httpParams}).pipe(  
      map((result: any) => result.data) 
    );
    
  }
}
