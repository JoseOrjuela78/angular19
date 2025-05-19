import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService<Body> {

  private http = inject(HttpClient);

  post(body:Body, url:string):Observable<any> {
     return this.http.post(url, body, { observe: 'response'});
  };
 
  put(body:Body, url:string):Observable<any> {
     return this.http.put(url, body, { observe: 'response'});
  };

  get(body:Body, url:string):Observable<any> {
     return this.http.get(url,{ observe: 'response'});
  };

  delete(id:string, url:string):Observable<any> {
     return this.http.delete(`${url}/${id}`,{ observe: 'response'});
  };

}
