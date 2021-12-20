import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api_url = environment.KMT_API +'users/';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<user>{
    return this.httpClient.get<user>(this.api_url + 'getusers');
  }
}
