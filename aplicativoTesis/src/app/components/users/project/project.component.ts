import { Component, OnInit } from '@angular/core';

import { Project } from 'src/app/interfaces/project.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project : Project ={
    name:"PeliApp",
    leaderid:"",
    description:"La mejor app de peliculas",
    membersid: ["Carlos Fuentes", "Sebastian Reyes", "Camilo Rozo"],
    skills: ["Programacion", "Diseño", "Bases De Datos","UI/UX"],
    phases: ["Desarrollo", "Pruebas", "Testing", "Documentacion"],
    state: true,
    organization: "UD",
    date_estimated: new Date().toISOString(),
  }

  constructor() { }

  ngOnInit(): void {
  }

}
