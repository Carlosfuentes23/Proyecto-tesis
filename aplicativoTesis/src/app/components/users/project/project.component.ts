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
    leader_id:"",
    description:"La mejor app de peliculas",
    members_id: ["Carlos Fuentes", "Sebastian Reyes", "Camilo Rozo"],
    skills: ["Programacion", "Diseño", "Bases De Datos","UI/UX"],
    phases: ["Desarrollo", "Pruebas", "Testing", "Documentacion"],
    state: true,
    date_estimated: Date.now(),
  }

  constructor() { }

  ngOnInit(): void {
  }

}
