import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:3000/api/auth/'; 
const testApiUrl = 'http://localhost:3000/api/test/'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  
  private readonly http: HttpClient = inject(HttpClient);
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${apiUrl}login`, { email, password });
    
  }

  logout(): Observable<void> {
    localStorage.setItem("isLoggedIn", "false")
    return this.http.post<void>(`${apiUrl}logout`, {});
  }

   register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean = false
  ): Observable<any> {
    return this.http.post(`${apiUrl}register`, {
      email,
      password,
      firstName,
      lastName,
      isAdmin,
    });
  }

  shouldBeLoggedIn(){
    return this.http.get(`${testApiUrl}should-be-loggedIn`, {});
  }
}
