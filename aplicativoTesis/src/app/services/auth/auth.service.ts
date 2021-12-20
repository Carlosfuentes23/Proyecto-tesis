import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { jwtResponse, user } from '../../interfaces/user.interface';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url = environment.KMT_API +'auth/';
  authSubject = new BehaviorSubject(false);
  private token?: string;

  constructor(private httpClient: HttpClient) { }

  register(user: user): Observable<user> {
    return this.httpClient.post<user>(this.api_url + 'register', user);
  }

  login(mail: string, password: string): Observable<jwtResponse> {
    const data = {
      email: mail,
      password
    };
    return this.httpClient.post<jwtResponse>(this.api_url + 'signin', data).pipe(
      tap(
        (res: jwtResponse) => {
          if (res) {
            this.saveToken(res.token);
          }
        }
      )
    );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
  }

  private saveToken(token: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN") || '';
    }
    return this.token;
  }
}
