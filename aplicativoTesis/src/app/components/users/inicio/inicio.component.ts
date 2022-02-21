import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/api/users.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  user = JSON.parse(sessionStorage.getItem("USER")!);
  usr: User = {};
  id: string | null;

  constructor(private userService: UsersService, private aRoute: ActivatedRoute) {
    

    this.id = this.aRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.getUser(this.id);
  }

  getUser(id: string | null) {
    if(id){
      this.userService.getUser(id).subscribe(
        (data: User) => {
          this.usr = data;
          console.log(this.usr)
        })
    }else{
      this.userService.getUser(this.user.user._id).subscribe(
        (data: User) => {
          this.usr = data;
          console.log(this.usr._id);
        })
    }
  }

}
