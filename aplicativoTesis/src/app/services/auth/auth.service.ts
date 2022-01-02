import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { jwtResponse, User } from '../../interfaces/user.interface';
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

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.api_url + 'register', user);
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
            this.saveToken(res);
          }
        }
      )
    );
  }

  logout(): void {
    this.token = '';
    sessionStorage.removeItem("ACCESS_TOKEN");
  }

  private saveToken(jwt: jwtResponse): void {
    sessionStorage.setItem("USER", JSON.stringify(jwt));
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN") || '';
    }
    return this.token;
  }
}
