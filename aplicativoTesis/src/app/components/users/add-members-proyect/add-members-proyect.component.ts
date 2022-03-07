import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/interfaces/user.interface';
import { ProjectsService } from 'src/app/services/api/projects.service';
import { UsersService } from 'src/app/services/api/users.service';

@Component({
  selector: 'app-add-members-proyect',
  templateUrl: './add-members-proyect.component.html',
  styleUrls: ['./add-members-proyect.component.css']
})
export class AddMembersProyectComponent implements OnInit {

  faPlus = faPlus;
  faTrash = faTrash;

  users: User[] = [];
  id = this.ac.snapshot.paramMap.get('id');

  constructor(private projectService: ProjectsService, private ac : ActivatedRoute) {
    if (this.id !== null) {
      this.getUsers(this.id);
    }

   }

  ngOnInit(): void {

  }

  getUsers(id: string){
    this.projectService.getUsersNotInProject(id).subscribe((res) => {
      this.users = res;
    });
  }

  addMember(user: User){
    console.log(user);
  }
}
