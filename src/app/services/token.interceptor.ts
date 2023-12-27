import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Check if a token is available in local storage
    console.log("inside interceptor means interceptor is working");

    let authReq = request;

    console.log(JSON.stringify(request, null, 2));

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5kaXAiLCJpYXQiOjE3MDM2OTA3NjEsImV4cCI6MTcwMzc3NzE2MX0.t6KWUa-Nk1v5y10iaPHgCZz0dOke1_q5lZPYkrLtkTQ";

    console.log("Interceptor token:", token);
    console.log("Interceptor called");

    // Include multipart form data in the headers
    const formDataHeaders = {
      Authorization: `Bearer ${token}`
    };

    if (token !== null) {
      console.log("Interceptor is running");
      authReq = authReq.clone({
        setHeaders: formDataHeaders,
      });
    }

    console.log("Request:", JSON.stringify(authReq, null, 2));

    return next.handle(authReq);
  }
}
