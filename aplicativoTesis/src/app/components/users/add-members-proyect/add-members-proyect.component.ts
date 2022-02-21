import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/api/users.service';

@Component({
  selector: 'app-add-members-proyect',
  templateUrl: './add-members-proyect.component.html',
  styleUrls: ['./add-members-proyect.component.css']
})
export class AddMembersProyectComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
      console.log(this.users);
    });
  }
}
