import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/api/users.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-members-phase',
  templateUrl: './add-members-phase.component.html',
  styleUrls: ['./add-members-phase.component.css']
})
export class AddMembersPhaseComponent implements OnInit {

  users: User[] = [];
  faPlus = faPlus;
  faTrash = faTrash;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
      console.log(this.users[0]);
    });
  }


  addMember(user: User){
    console.log(user);
  }
}
