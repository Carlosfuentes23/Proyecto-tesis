import Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Abilitie, members } from 'src/app/interfaces/abilitie.interface';
import { Phase } from 'src/app/interfaces/phase.interface';

import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AbilitieService } from 'src/app/services/api/abilitie.service';
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
  projectPhases: Phase[] = [];
  projectAbilities: Abilitie[] = [];
  user = JSON.parse(sessionStorage.getItem("USER")!);
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

  chartOptions = {
    responsive: true
  };

  constructor(
    private userService: UsersService,
    private projectService: ProjectsService,
    private abilitieService: AbilitieService,
    private aRoute: ActivatedRoute
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if(this.id) {
      this.getProject(this.id);
      this.getPhases(this.id);
      this.getAbilitie(this.id);
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
    this.projectService.getProjectMembers(id).subscribe((data: any) => {
      this.projectMembers = data;
    })
  }

  getPhases(id: string): void {
    this.projectService.getProjectPhases(id).subscribe((data: any) => {
      this.projectPhases = data;
    });
  }

  getAbilitie(id: string): void {
    this.abilitieService.getAbilitieByProjectId(id).subscribe((data: Abilitie[]) => {
      this.projectAbilities = data;
      if(data)
      data.forEach(abilitie =>{
        this.getChartDdata(abilitie)
      })
    });
  }

  getChartDdata(abi: Abilitie){
    if(abi.name){
      this.chartLabels.push(abi.name)
    }
    if(abi.members){
      this.getPromAbilitie(abi.members)
      this.seeCart=true;
    }
  }

  getPromAbilitie(members:members[]){
    let prom = 0
    members.forEach(element => {
      element.notes?.forEach(element => {
        prom = prom + Number(element.note)
      });
    });
    this.notes.push(prom/members.length)
    if((prom/members.length) >= 1 && (prom/members.length) < 5){
      this.hoverBgColors.push('#ff3232')
      this.bgColors.push('#fe6160')
    }else if((prom/members.length) >= 5 && (prom/members.length) < 8){
      this.bgColors.push('#fdff82')
      this.hoverBgColors.push('#f9fc3f')
    }else{
      this.bgColors.push('#9acfa3')
      this.hoverBgColors.push('#71cf80')
    }
  }

  closeProject(){
    Swal.fire({
      icon:'warning',
      title:'¿Seguro que desea cerrar el proyecto?',
      text: 'Si cierra el pryecto no padra editarlo nuevamete',
      showCancelButton: true,
      cancelButtonColor: 'red',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.project.state = 'CLOSE'
        this.projectService.updateProject(this.project).subscribe(()=>{
          this.ngOnInit();
        })
      }
    })
  }
}
