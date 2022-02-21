import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api_url = environment.KMT_API +'users/';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.api_url + 'getusers');
  }

  getUser(id: string): Observable<User>{
    return this.httpClient.get<User>(this.api_url + 'getuser/' + id);
  }

  updateUser(user: User): Observable<User>{
    return this.httpClient.put<User>(this.api_url + 'updateuser', user);
  }
}
