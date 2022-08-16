import { Component, OnInit } from '@angular/core';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-add-members-abilitie',
  templateUrl: './add-members-abilitie.component.html',
  styleUrls: ['./add-members-abilitie.component.css']
})
export class AddMembersAbilitieComponent implements OnInit {

  addOrNot = false;
  faPlus = faPlus;
  faTrash = faTrash;
  members: User[] = [];
  project: Project ={};
  usr = JSON.parse(sessionStorage.getItem('USER')!);

  constructor() { }

  ngOnInit(): void {
  }

}
