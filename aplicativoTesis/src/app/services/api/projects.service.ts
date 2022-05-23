import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Phase } from 'src/app/interfaces/phase.interface';
import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  api_url = environment.KMT_API +'projects/';

  constructor(private httpClient: HttpClient) { }

  createProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(this.api_url + 'createproject', project);
  }

  getProjectsList(): Observable<Project> {
    return this.httpClient.get<Project>(this.api_url + 'getprojects');
  }

  getProject(id: string): Observable<Project> {
    return this.httpClient.get<Project>(this.api_url + 'getproject/' + id);
  }

  updateProject(project: Project): Observable<Project> {
    return this.httpClient.put<Project>(this.api_url + 'updateproject', project);
  }

  getProjectMembers(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.api_url + 'getprojectmembers/' + id);
  }

  getProjectPhases(id: string): Observable<Phase[]> {
    return this.httpClient.get<Phase[]>(this.api_url + 'getprojectphases/' + id);
  }

  getUsersNotInProject(id: string): Observable<User[]>{
    return this.httpClient.get<User[]>(this.api_url + 'getprojectmembersnotinproject/' + id);
  }

  getProjectsByUser(id: string): Observable<Project[]>{
    return this.httpClient.get<Project[]>(this.api_url + 'getprojectlistforuser/' + id);
  }

  getProjectsByLeader(id: string): Observable<Project[]>{
    return this.httpClient.get<Project[]>(this.api_url + 'getprojectlistforleader/' + id);
  }

  addMemberToProject(user:User, projectId:string): Observable<Project> {
    return this.httpClient.post<Project>(this.api_url + 'addmembertoproject/'+projectId, user);
  }

  removeMemberFromProject(user:User, projectId:string): Observable<Project> {
    return this.httpClient.post<Project>(this.api_url + 'removememberfromproject/'+projectId, user);
  }
}
