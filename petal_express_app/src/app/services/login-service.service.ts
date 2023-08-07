import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroments';
import { Login } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _serverUrl = `${environment.serverUrl}/api/auth`;
  constructor(private http: HttpClient) { }

  login(loginInfo: any): Observable<any> {
    //calling login backend api and returning the response
    return this.http.post<any>(this._serverUrl, loginInfo);
  }


}
