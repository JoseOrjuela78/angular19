import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { URIS } from '../common/constants/Uris';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private http = inject(HttpClient);

   postCerrarSesion(timeZone:string):Observable<any>{
      return this.http.post(URIS.logout, { date: timeZone }, { observe: 'response'});
   };
}
