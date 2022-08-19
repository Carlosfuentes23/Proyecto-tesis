import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-add-members-abilitie',
  templateUrl: './add-members-abilitie.component.html',
  styleUrls: ['./add-members-abilitie.component.css']
})
export class AddMembersAbilitieComponent implements OnInit {

  id: string | null;
  addOrNot = false;
  faPlus = faPlus;
  faTrash = faTrash;
  members: User[] = [];
  project: Project ={};
  usr = JSON.parse(sessionStorage.getItem('USER')!);

  constructor(
    private ac: ActivatedRoute
  ) {
    this.id = this.ac.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.addOrListMembers();
  }

  addOrListMembers() {
    this.ac.url.subscribe((url) => {
      console.log(url);
    })
  }
}
