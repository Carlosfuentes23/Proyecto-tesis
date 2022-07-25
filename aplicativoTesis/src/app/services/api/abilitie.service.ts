import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Abilitie } from 'src/app/interfaces/abilitie.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbilitieService {
  api_url = environment.KMT_API +'abilities/';

  constructor(private httpClient: HttpClient) { }

  createAbilitie(phaseId: string,abilitie: Abilitie): Observable<Abilitie> {
    return this.httpClient.post<Abilitie>(this.api_url+'createability/'+ phaseId, abilitie);
  }

  updateAbilitie(abilitie: Abilitie): Observable<Abilitie> {
    return this.httpClient.post<Abilitie>(this.api_url+'updateability/'+ abilitie._id, abilitie);
  }

  GetAbilitieById(abilitieId: string): Observable<Abilitie> {
    return this.httpClient.get<Abilitie>(this.api_url+'getability/'+ abilitieId);
  }

  getAbilitieByProjectId(projectId: string): Observable<Abilitie[]> {
    return this.httpClient.get<Abilitie[]>(this.api_url+'getabilitylist/'+ projectId);
  }

  GetAbilitieList(): Observable<Abilitie[]> {
    return this.httpClient.get<Abilitie[]>(this.api_url+'getabilitylist');
  }
}
