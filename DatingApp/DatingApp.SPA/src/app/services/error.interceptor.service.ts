import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS, } from '@angular/common/http';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch(error => {
      if (error instanceof HttpErrorResponse) {
        const applicationError = error.headers.get('Application-Error');
        if (applicationError) {
          return Observable.throw(applicationError);
        }

        const serverError = error.error;
        let modelStateErrors = '';
        if (serverError && typeof serverError === 'object') {
          for (const key in serverError) {
            if (serverError[key]) {
              modelStateErrors += serverError[key] + '\n';
            }
          }
        }

        return Observable.throw(
          modelStateErrors || serverError || 'Server error'
        );
      }
    });
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptorService,
  multi: true
};
