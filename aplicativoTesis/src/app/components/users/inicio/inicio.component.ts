import { FormControl } from '@angular/forms';
import { Abilitie, members, notes } from 'src/app/interfaces/abilitie.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ProjectsService } from 'src/app/services/api/projects.service';
import { UsersService } from 'src/app/services/api/users.service';
import { AbilitieService } from 'src/app/services/api/abilitie.service';

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
  userAbilities: Abilitie[] = [];
  selectProjects: Project[] =[]
  select = new FormControl;

  notes: number [] = []
  bgColors: string[] = []
  hoverBgColors: string[] = []
  seeCart = false;

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
    private userService: UsersService,
    private aRoute: ActivatedRoute,
    private projectService: ProjectsService,
    private abilitieService: AbilitieService
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
        this.selectProjects = data;
        this.select.setValue(data[0]._id)
        if(data[0]._id){
          this.getAbilitiesByProject(data[0]._id)
        }
        this.projects = this.projects.filter((project: Project) => {
          return project.leaderid !== id;
        });

      });
    } else {
      this.projectService
        .getProjectsByUser(this.user.user._id)
        .subscribe((data: Project[]) => {
          this.projects = data;
          this.selectProjects = data;
          this.select.setValue(data[0]._id)
          if(data[0]._id){
            this.getAbilitiesByProject(data[0]._id)
          }
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

  getAbilitiesByProject(idProject: string){
    if(this.userAbilities.length > 0){
      this.userAbilities = [];
      this.notes = [];
      this.bgColors= [];
      this.hoverBgColors = [];
      this.chartLabels = [];
    }
    this.abilitieService.getAbilitieByProjectId(idProject).subscribe((data: Abilitie[])=>{
      if(this.id){
        this.getAbilitiesForUser(data);
      }else{
        this.getAbilitiesForUserLog(data);
      }
      if(this.userAbilities.length)
        this.seeCart = true;
    })
  }

  getAbilitiesForUser(abilities : Abilitie[]){
    if(abilities){
      abilities.forEach(element => {
        element.members?.forEach(member =>{
          if(member.id_member === this.id){
            this.userAbilities.push(element);
            this.setNotesAbilite(member)
            if(element.name)
              this.chartLabels.push(element.name);
          }
        })
      });
    }else{
      this.seeCart = false;
    }
  }

  getAbilitiesForUserLog(abilities : Abilitie[]){
    if(abilities){
      abilities.forEach(element => {
        element.members?.forEach(member =>{
          if(member.id_member === this.user.user._id){
            this.userAbilities.push(element);
            this.setNotesAbilite(member)
            if(element.name)
              this.chartLabels.push(element.name);
          }
        })
      });
    }else{
      this.seeCart = false;
    }
  }

  setNotesAbilite(member:members){
    let prom = 0
    member.notes?.forEach(element => {
      prom = prom + Number(element.note)
    });
    if(member.notes){
      this.notes.push(prom/member.notes.length)
      if((prom/member.notes.length) >= 1 && (prom/member.notes.length) < 5){
        this.hoverBgColors.push('#ff3232')
        this.bgColors.push('#fe6160')
      }else if((prom/member.notes.length) >= 5 && (prom/member.notes.length) < 8){
        this.bgColors.push('#fdff82')
        this.hoverBgColors.push('#f9fc3f')
      }else{
        this.bgColors.push('#9acfa3')
        this.hoverBgColors.push('#71cf80')
      }
    }
  }
}
