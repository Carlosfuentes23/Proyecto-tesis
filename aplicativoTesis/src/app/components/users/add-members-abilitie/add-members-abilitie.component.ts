import { Project } from './../../../interfaces/project.interface';
import { UsersService } from './../../../services/api/users.service';
import { ProjectsService } from './../../../services/api/projects.service';
import { Phase } from './../../../interfaces/phase.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Abilitie, members } from 'src/app/interfaces/abilitie.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AbilitieService } from 'src/app/services/api/abilitie.service';
import { PhasesService } from 'src/app/services/api/phases.service';

@Component({
  selector: 'app-add-members-abilitie',
  templateUrl: './add-members-abilitie.component.html',
  styleUrls: ['./add-members-abilitie.component.css']
})
export class AddMembersAbilitieComponent implements OnInit {

  id: string | null;
  phaseId: string | null;
  addOrNot = false;
  faPlus = faPlus;
  faTrash = faTrash;
  members: User[] = [];
  notMembers: User[] = [];
  phase: Phase = {};
  project: Project = {};
  abilitie: Abilitie = {}
  usr = JSON.parse(sessionStorage.getItem('USER')!);

  constructor(
    private phaseService: PhasesService,
    private projectService: ProjectsService,
    private abilitieService: AbilitieService,
    private ac: ActivatedRoute
  ) {
    this.id = this.ac.snapshot.paramMap.get('id');
    this.phaseId = this.ac.snapshot.paramMap.get('phaseId');
  }

  ngOnInit(): void {
    this.addOrListMembers();
    if(this.id){
      this.getAbilitie(this.id);
    }
  }

  addOrListMembers() {
    this.ac.url.subscribe((url) => {
      if(url[2].path === 'add-members-abilities'){
        this.addOrNot = true;
        if(this.id){
          this.getAbilitie(this.id);
        }
      }else{
        this.getNotMembers();
      };
    })
  }

  getAbilitie(abilitieId : string) {
    this.abilitieService.getAbilitieById(abilitieId).subscribe((data) => {
      this.abilitie = data;
      console.log(data.members);
    })
  }

  getPhase(phaseId: string) {
    this.phaseService.getPhase(phaseId).subscribe((data) => {
      this.phase = data;
      if(this.phase.projectid){
        this.getProject(this.phase.projectid)
      }
      console.log(data);
    })
  }

  getProject(prijectId: string){
    this.projectService.getProject(prijectId).subscribe((data) =>{
      this.project = data;
    })
  }

  getPhaseMembers(phaseId: string){
    this.phaseService.getPhaseMembers(phaseId).subscribe((data) => {
      this.members = data;
    })
  }

  //guardar los miembros de la phase que no pertenecessen a la abilidad en notMembers
  getNotMembers(){
    if(this.id && this.phaseId){
      this.getAbilitie(this.id);
      this.getPhase(this.phaseId!);
      this.getPhaseMembers(this.phaseId!);
    }
    this.members.forEach((member) => {
      if(this.abilitie.members){
        this.abilitie.members.forEach((abilitieMember) => {
          if(member._id !== abilitieMember.id_member){
            this.notMembers.push(member);
          }
        })
      }
    })
  }



  addMember(usr: User){

  }

  removeMember(usr: members){

  }

}
