import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ProjectsService } from 'src/app/services/api/projects.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-members-proyect',
  templateUrl: './add-members-proyect.component.html',
  styleUrls: ['./add-members-proyect.component.css'],
})
export class AddMembersProyectComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  addOrNot = false;
  project: Project = {};

  users: User[] = [];
  id = this.ac.snapshot.paramMap.get('id');
  usr = JSON.parse(sessionStorage.getItem('USER')!);

  constructor(
    private projectService: ProjectsService,
    private ac: ActivatedRoute
  ) {
    if (this.id){ 
      this.getProject(this.id);
      this.addOrListMembers();
    }
  }

  ngOnInit(): void {}

  addOrListMembers() {
    this.ac.url.subscribe((url) => {
      if (url[0].path === 'add-members-project') {
        this.addOrNot = true;
        if (this.id) this.getUsersNotInProject(this.id);
      } else {
        this.addOrNot = false;
        if (this.id) {
          this.getUsersProject(this.id);
        }
      }
    });
  }

  getProject(id: string) {
    this.projectService.getProject(id).subscribe((res) => {
      this.project = res;
      this.project.leaderid
    });
  }

  getUsersProject(id: string) {
    this.projectService.getProjectMembers(id).subscribe((res) => {
      this.users = res;
    });
  }

  getUsersNotInProject(id: string) {
    this.projectService.getUsersNotInProject(id).subscribe((res) => {
      this.users = res;
    });
  }

  addMember(user: User) {
    Swal.fire({
      title: '¿Está seguro de agregar a este usuario al proyecto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && this.id) {
        this.projectService.addMemberToProject(user, this.id).subscribe(
          () => {
            if (this.id) {
              this.getUsersNotInProject(this.id);
            }
          },
          (err) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo agregar al usuario',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#3085d6',
            });
          }
        );
      }
    });
  }

  removeMember(user: User) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Deseas agregar a ${user.name} la proyecto?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && this.id) {
        this.projectService.removeMemberFromProject(user, this.id).subscribe(
          () => {
            if (this.id) {
              this.getUsersProject(this.id);
            }
          },
          (err) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar al usuario',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#3085d6',
            });
          }
        );
      }
    });
  }
}
