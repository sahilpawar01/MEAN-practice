import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private _loginUrl = "http://localhost:3000/api/login";

  constructor(private http: HttpClient, private _router: Router) { }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }

  logoutUser() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      this._router.navigate(['/events']);
    } else {
      console.error('localStorage is not available in this environment.');
      // Handle it accordingly, e.g., redirect or show a message.
    }
  }

  getToken() {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  }

  loggedIn() {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem('token');
  }
}
