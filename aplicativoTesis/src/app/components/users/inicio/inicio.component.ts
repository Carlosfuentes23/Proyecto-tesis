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

  constructor(
    private userService: UsersService,
    private aRoute: ActivatedRoute,
    private projectService: ProjectsService
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getUser(this.id);
    this.getProjects(this.id);
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

  getProjects(id: string | null): void {
    if (id) {
      this.projectService.getProjectsByUser(id).subscribe((data: any) => {
        console.log(data);
        //guardar solo los 3 primeros proyectos
        this.projects = data.slice(0, 3);
        this.leadProjects = data.filter((project: Project) => {
          return project.leaderid === this.user.user._id;
        })
      });
    } else {
      this.projectService.getProjectsByUser(this.user.user._id).subscribe((data: any) => {
        console.log(data);
        this.projects = data;
        this.leadProjects = data.filter((project: Project) => {
          return project.leaderid === this.user.user._id;
        })
      });
    }
  }
}
