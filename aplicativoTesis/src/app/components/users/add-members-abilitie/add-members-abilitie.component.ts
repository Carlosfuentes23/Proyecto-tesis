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
        console.log(this.addOrNot);
        this.getNotMembers();
      }else{
        if(this.id){
          console.log(this.addOrNot);
          this.getAbilitie(this.id);
        }
      };
    })
  }

  getAbilitie(abilitieId : string) {
    this.abilitieService.getAbilitieById(abilitieId).subscribe((data) => {
      this.abilitie = data;
    })
  }

  getPhase(phaseId: string) {
    this.phaseService.getPhase(phaseId).subscribe((data) => {
      this.phase = data;
      if(this.phase.projectid){
        this.getProject(this.phase.projectid);
      };
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
      console.log(this.members);
      if(this.abilitie.members  && this.abilitie.members.length > 0 && this.members){
        this.notMembers = this.members.filter((member) => {
          if(this.abilitie.members){
            return !this.abilitie.members.find((abilitieMember) => {
              return abilitieMember.id_member !== member._id;
            })
          }else{
            return true;
          }
        })
      }else{
        console.log(this.members);
        this.notMembers = this.members;
      }
    })
  }

  //guardar los miembros de la phase que no pertenecessen a la abilidad en notMembers
  getNotMembers(){
    if(this.id && this.phaseId){
      this.getAbilitie(this.id);
      this.getPhase(this.phaseId);
      this.getPhaseMembers(this.phaseId);
    }
  }



  addMember(usr: User){

  }

  removeMember(usr: members){

  }

}
