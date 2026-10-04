import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  message: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminauthService {


   private apiUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) {}

  login(credentials: AdminLoginRequest): Observable<AdminLoginResponse> {
    return this.http.post<AdminLoginResponse>(
      `${this.apiUrl}/login`,
      credentials,
      {
        withCredentials: true
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      {
        withCredentials: true
      }
    );
  }

}
