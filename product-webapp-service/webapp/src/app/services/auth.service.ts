import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8008/api/v1/auth-service';
  private USERNAME = '';
  private USEREMAIL = '';
  private USERROLE = '';
  private IsLoggedIn = false;
  private token = '';

  constructor(private http: HttpClient) { }

  login() {
    console.log('Logging in...');
    this.USERNAME = 'Dummy Name';
    this.USEREMAIL = 'dummyuser@gmail.com';
    this.USERROLE = 'admin';
    this.IsLoggedIn = true;
    this.token = 'dummytoken';
  }

  getUserName(): string {
    return this.USERNAME;
  }

  getUserEmail(): string {
    return this.USEREMAIL;
  }

  getUserRole(): string {
    return this.USERROLE;
  }

  getIsLoggedIn(): boolean {
    return this.IsLoggedIn;
  }

  getToken(): string {
    return this.token;
  }

  logout() {
    this.USERNAME = '';
    this.USEREMAIL = '';
    this.USERROLE = '';
    this.IsLoggedIn = false;
    this.token = '';
  }
}
 