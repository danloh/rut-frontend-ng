import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../service';

@Injectable()
export class HttpIntercept implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.authService.getToken();

    if (token) {
      headersConfig['Authorization'] = token;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
