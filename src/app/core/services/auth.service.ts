import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any = null;
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  register = (user: object): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signup', user);
  };

  login = (user: object): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signin', user);
  };

  saveUserData = (): void => {
    let token: any = localStorage.getItem('token');

    if (token) {
      try {
        this.userData = jwtDecode(token);
        console.log(this.userData);
      } catch (error) {
        this._Router.navigate(['login']);
        localStorage.clear();
      }
    }
  };

  logOut = (): void => {
    localStorage.removeItem('token');
    this.userData = null;
    this._Router.navigate(['/login']);
  };
}
