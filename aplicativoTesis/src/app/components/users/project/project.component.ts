import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ProjectsService } from 'src/app/services/api/projects.service';
import { UsersService } from 'src/app/services/api/users.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  id: string | null;
  project: Project = {};
  leader: User = {};
  projectMembers: User[] = [];

  constructor(
    private userService: UsersService,
    private projectService: ProjectsService,
    private aRoute: ActivatedRoute
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if(this.id) {
      this.getProject(this.id);
    }

  }

  getProject(id: string): void {
    this.projectService.getProject(id).subscribe((data: Project) => {
      this.project = data;
      if(this.project.leaderid) {
        this.getLeader(this.project.leaderid);
        this.getMembers(id)
      }
    })
  }

  getLeader(id: string): void {
    this.userService.getUser(id).subscribe((data: User) => {
      this.leader = data;
    })
  }

  getMembers(id: string): void {
    this.projectService.gatProjectMembers(id).subscribe((data: any) => {
      this.projectMembers = data;
    })
  }
}
