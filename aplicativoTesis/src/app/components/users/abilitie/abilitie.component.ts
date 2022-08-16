import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Abilitie } from 'src/app/interfaces/abilitie.interface';
import { Phase } from 'src/app/interfaces/phase.interface';
import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AbilitieService } from 'src/app/services/api/abilitie.service';
import { PhasesService } from 'src/app/services/api/phases.service';
import { ProjectsService } from 'src/app/services/api/projects.service';
import { UsersService } from 'src/app/services/api/users.service';

@Component({
  selector: 'app-abilitie',
  templateUrl: './abilitie.component.html',
  styleUrls: ['./abilitie.component.css']
})
export class AbilitieComponent implements OnInit {

  id: string | null;
  projectId: string | null;
  phaseId: string | null;
  abilitie?: Abilitie;
  leader: User = {};
  phase: Phase = {};
  user = JSON.parse(sessionStorage.getItem("USER")!);

  constructor(
    private aRoute : ActivatedRoute,
    private projectService: ProjectsService,
    private phaseService: PhasesService,
    private abilitieService: AbilitieService,
    private userService: UsersService,
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.projectId = this.aRoute.snapshot.paramMap.get('projectId');
    this.phaseId = this.aRoute.snapshot.paramMap.get('phaseId');
  }

  ngOnInit(): void {
    if(this.id) {
      this.getAbilitiesById(this.id);
      if(this.projectId) {
        this.getLeader(this.projectId);
      }
      if(this.phaseId) {
        this.getPhase(this.phaseId);
      }
    }
  }

  getAbilitiesById(userId: string): void {
    this.abilitieService.getAbilitieById(userId).subscribe((data: Abilitie) => {
      this.abilitie = data;
    })
  }

  getPhase(id: string): void {
    this.phaseService.getPhase(id).subscribe((data: Phase) => {
      this.phase = data;
      if(this.phase.projectid){
        this.getLeader(this.phase.projectid);
      }
    });
  }

  getLeader(projectId:string): void  {
    this.projectService.getProject(projectId).subscribe((data: Project) => {
      if (data.leaderid) {
        this.userService.getUser(data.leaderid).subscribe((data: User) => {
          this.leader = data;
        })
      }
    })
  }
}
