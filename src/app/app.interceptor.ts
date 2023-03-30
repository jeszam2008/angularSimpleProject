import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { HttpProgressLoaderService } from './services/http-progress-loader.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  private isSessionExpired: boolean = false; 

  constructor(private httpProgressLoader: HttpProgressLoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const reqURL = request.url;  
    this.httpProgressLoader.isLoading.next(true);
    
    return next.handle(request).pipe(tap((event: HttpEvent<unknown>) => { 
      this.httpProgressLoader.setProgressValue(1); 
      this.httpProgressLoader.setLoaderMap(reqURL, true); 

      if (event instanceof HttpResponse) {
        this.isSessionExpired = true;
      } 

      return event;
    }), finalize(() => {
      this.httpProgressLoader.setProgressValue(-1); 
      if (this.isSessionExpired) {
        // alert('Session Expired');
        console.log('Gotcha');
      }

      this.httpProgressLoader.setLoaderMap(reqURL, false);
    }));
  }
}
