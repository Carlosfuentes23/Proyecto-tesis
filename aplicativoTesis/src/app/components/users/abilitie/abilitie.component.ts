import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Abilitie, members } from 'src/app/interfaces/abilitie.interface';
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
  notes: number [] = []
  bgColors: string[] = []
  hoverBgColors: string[] = []
  seeCart = false;
  faPlus = faPlus;
  faEdit = faEdit;

  chartData = [
    {
      data: this.notes,
      label: '',
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
      if(data.members)
        this.getChartData(data.members)
    })
  }

  getChartData(data:members[]){
    this.seeCart = true;
    data.forEach(element => {
      this.chartLabels.push(element.name+''+element.lastname)
      element.notes?.forEach(note =>{
        if(note.phaseId === this.phaseId){
          this.chartData[0].data.push(Number(note.note))
          if(Number(note.note) >= 1 && Number(note.note) < 5){
            this.hoverBgColors.push('#ff3232')
            this.bgColors.push('#fe6160')
          }else if(Number(note.note) >= 5 && Number(note.note) < 8){
            this.bgColors.push('#fdff82')
            this.hoverBgColors.push('#f9fc3f')
          }else{
            this.bgColors.push('#9acfa3')
            this.hoverBgColors.push('#71cf80')
          }
        }
      })
    });

  }

  getPhase(id: string): void {
    this.phaseService.getPhase(id).subscribe((data: Phase) => {
      this.phase = data;
      if(this.phase.name){
        this.chartData[0].label = this.phase.name
      }
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
