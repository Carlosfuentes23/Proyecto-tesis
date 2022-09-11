import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Abilitie, notes, members } from 'src/app/interfaces/abilitie.interface';
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
  abilities: Abilitie[] = [];
  user = JSON.parse(sessionStorage.getItem("USER")!);
  faPlus = faPlus;
  faEdit = faEdit;
  notes: number [] = []
  bgColors: string[] = []
  hoverBgColors: string[] = []
  seeCart = false;

  chartData = [
    {
      data: this.notes,
      label: 'Habilidades',
      backgroundColor: this.bgColors,
      hoverBackgroundColor: this.hoverBgColors,
      borderColor: 'black',
    }
  ];

  chartLabels: string[] =[];

  public barChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min:0,
        max: 10
      }
    },
    backgroundColor: 'rgba(255,0,0,0,0.3)',
    borderColor: 'black',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
  }


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
      if(this.phase.projectid){
        this.getLeader(this.phase.projectid);
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
    this.phaseService.getPhaseAbilities(phaseId).subscribe((data: Abilitie[]) => {
      this.abilities = data;
      this.getChartData(data);
    });
  }

  getChartData(data:Abilitie[]){
    data.forEach(abilitie =>{
      if(abilitie.name){
        this.chartLabels.push(abilitie.name)
      }
      if(abilitie.members){
        this.notePromAbilitie(abilitie.members)
      }
    })
    this.seeCart = true;
  }

  notePromAbilitie(data: members[]){
    let prom = 0
    data.forEach(member=>{
      member.notes?.forEach(note =>{
        if(note.phaseId === this.id && note.note){
          prom = prom + Number(note.note)
        }
      })
    })
    this.notes.push(prom/data.length)
    if((prom/data.length) >= 1 && (prom/data.length) < 5){
      this.hoverBgColors.push('#ff3232')
      this.bgColors.push('#fe6160')
    }else if((prom/data.length) >= 5 && (prom/data.length) < 8){
      this.bgColors.push('#fdff82')
      this.hoverBgColors.push('#f9fc3f')
    }else{
      this.bgColors.push('#9acfa3')
      this.hoverBgColors.push('#71cf80')
    }
  }
}
