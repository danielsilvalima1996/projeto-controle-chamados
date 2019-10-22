import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwt = sessionStorage.getItem('token');
    console.log(jwt);
    

    request = request.clone({
      headers: request.headers.set('Authorization', `${jwt}`)
    });

    console.log(request);

    return next.handle(request);
  }
}
