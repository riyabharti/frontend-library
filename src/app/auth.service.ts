import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  intercept(req, next) {
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token1')}`
      }
    });
    return next.handle(newReq);
  }

  constructor() { }
}
