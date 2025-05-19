import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { StorageService } from '../strorage/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

   private storeService = inject(StorageService);
   private router = inject(Router);

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return from(this.storeService.getToken()).pipe(
    switchMap(token => {
      const authReq = (token === '' || token === undefined)
        ? request
        : request.clone({
            setHeaders: {
              Authorization: token
            }
          });

      return next.handle(authReq).pipe(
        tap({
          error: (error: any) => {
            if (error.status === 401) {
              this.router.navigate(['/login', 'Sesion Caducada']);
            }
          }
        })
      );
    })
  );
}
}





