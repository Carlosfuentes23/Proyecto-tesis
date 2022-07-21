import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Phase } from 'src/app/interfaces/phase.interface';
import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';
import { PhasesService } from 'src/app/services/api/phases.service';
import { ProjectsService } from 'src/app/services/api/projects.service';
import { UsersService } from 'src/app/services/api/users.service';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css'],
})
export class PhaseComponent implements OnInit {
  id: string | null;

  phase: Phase = {};
  leader: User = {};
  phaseMembers: User[] = [];
  user = JSON.parse(sessionStorage.getItem("USER")!);


  constructor(
    private phaseService: PhasesService,
    private projectService: ProjectsService,
    private userService: UsersService,
    private ac: ActivatedRoute
  ) {
    this.id = this.ac.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id) {
      this.getPhase(this.id);
      this.getPhaseMembers(this.id);
      this.getAbilities(this.id);
    }
  }

  getPhase(id: string): void {
    this.phaseService.getPhase(id).subscribe((data: Phase) => {
      this.phase = data;
      if(this.phase.project_id){
        this.getLeader(this.phase.project_id);
      }
    });
  }

  getPhaseMembers(id: string): void {
    this.phaseService.getPhaseMembers(id).subscribe((data: any) => {
      this.phaseMembers = data;
    });
  }


  getLeader(projectId:string): void  {
    this.projectService.getProject(projectId).subscribe((data: Project) => {
      if (data.leaderid) {
        this.userService.getUser(data.leaderid).subscribe((data: User) => {
          this.leader = data;
        });
      }
    });
  }

  getAbilities(phaseId: string): void {
    this.phaseService.getPhaseAbilities(phaseId).subscribe((data: any) => {
      console.log(data);
    });
  }
}
