import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URIS } from '../common/constants/Uris';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private http = inject(HttpClient);

 login(username: string, password: string):Observable<any> {
    return this.http.post(URIS.login, { userName: username, password: password }, { observe: 'response'});
 };

 loadPermissionsUser():Observable<any>{
    return this.http.get(URIS.parametrias.getPermissionsUser,{ observe: 'response'});
 };

 changePasswordUserBO(data: any):Observable<any>{
   return this.http.post(URIS.usuarios.cambiarContrasena, data, { observe: 'response'});
 }


}
