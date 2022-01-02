import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/api/users.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  user = JSON.parse(sessionStorage.getItem("USER")!);
  usr: User ={};

  constructor(private userService: UsersService) { 
    this.userService.getUser(this.user.user._id).subscribe(
      (data: User) => {
        this.usr = data;
        console.log(this.usr.projects);
      }
    )
  }

  ngOnInit(): void {
  }


}
