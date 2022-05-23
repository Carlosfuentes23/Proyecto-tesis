import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Phase } from 'src/app/interfaces/phase.interface';
import { User } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhasesService {
  api_url = environment.KMT_API +'phases/';

  constructor(private httpClient: HttpClient) { }

  createPhase(phase: Phase): Observable<Phase> {
    return this.httpClient.post<Phase>(this.api_url + 'createphase/' + phase.project_id, phase);
  }

  getPhasesList(): Observable<Phase> {
    return this.httpClient.get<Phase>(this.api_url + 'getphases');
  }

  getPhase(id: string): Observable<Phase> {
    return this.httpClient.get<Phase>(this.api_url + 'getphase/' + id);
  }

  updatePhase(phase: Phase): Observable<Phase> {
    return this.httpClient.put<Phase>(this.api_url + 'updatephase', phase);
  }

  getPhaseMembers(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.api_url + 'getphasemembers/' + id);
  }

  addMemberPhase(user:User, phaseId:string): Observable<Phase> {
    return this.httpClient.post<Phase>(this.api_url + 'addmembertophase/'+phaseId, user);
  }

  removeMemberPhase(user:User, phaseId:string): Observable<User> {
    return this.httpClient.post<User>(this.api_url + 'removememberfromphase/'+phaseId, user);
  }
}
