import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ProjectsService } from 'src/app/services/api/projects.service';
import { UsersService } from 'src/app/services/api/users.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  user = JSON.parse(sessionStorage.getItem('USER')!);
  usr: User = {};
  projects: Project[] = [];
  leadProjects: Project[] = [];
  id: string | null;
  selectedTab: 'lead' | 'dev' = 'lead';

  constructor(
    private userService: UsersService,
    private aRoute: ActivatedRoute,
    private projectService: ProjectsService
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getUser(this.id);
    this.getProjectsWhereDev(this.id);
    this.getProjectsWhereLead(this.id);
  }

  getUser(id: string | null) {
    if (id) {
      this.userService.getUser(id).subscribe((data: User) => {
        this.usr = data;
      });
    } else {
      this.userService.getUser(this.user.user._id).subscribe((data: User) => {
        this.usr = data;
      });
    }
  }

  getProjectsWhereDev(id: string | null): void {
    if (id) {
      this.projectService.getProjectsByUser(id).subscribe((data: Project[]) => {
        this.projects = data;
        this.projects = this.projects.filter((project: Project) => {
          return project.leaderid !== this.user.user._id;
        });
      });
    } else {
      this.projectService
        .getProjectsByUser(this.user.user._id)
        .subscribe((data: Project[]) => {
          this.projects = data;
          this.projects = this.projects.filter((project: Project) => {
            return project.leaderid !== this.user.user._id;
          });
        });
    }
  }

  getProjectsWhereLead(id: string | null): void {
    if (id) {
      this.projectService.getProjectsByLeader(id).subscribe((data: any) => {
        this.leadProjects = data;
      });
    } else {
      this.projectService
        .getProjectsByLeader(this.user.user._id)
        .subscribe((data: Project[]) => {
          this.leadProjects = data;
        });
    }
  }
}
