import { S } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/interfaces/user.interface';
import { ProjectsService } from 'src/app/services/api/projects.service';
import { UsersService } from 'src/app/services/api/users.service';
import Swal from 'sweetalert2';

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
    if (this.id) {
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
    Swal.fire({
      title: '¿Está seguro de agregar a este usuario al proyecto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && this.id) {
        this.projectService.addMemberToProject(user, this.id).subscribe(() => {
          if (this.id) {
            this.getUsers(this.id);
          }
        }, (err) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo agregar al usuario',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',
          });
        })
      }
    })
  }
}
