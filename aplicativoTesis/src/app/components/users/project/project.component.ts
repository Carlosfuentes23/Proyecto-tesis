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
    leader:"Carlos Fuentes",
    dateCreate: Date.now(),
    dateEstimada: Date.now(),
    description:"La mejor app de peliculas",
    integrantes: ["Carlos Fuentes", "Sebastian Reyes", "Camilo Rozo"],
    reuniones:["reunion 1","reunion 2", "reunion 3"]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
