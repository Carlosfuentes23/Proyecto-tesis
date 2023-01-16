import Swal from 'sweetalert2';
import { Project } from './../../../interfaces/project.interface';
import { ProjectsService } from './../../../services/api/projects.service';
import { Phase } from './../../../interfaces/phase.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Abilitie, members, notes } from 'src/app/interfaces/abilitie.interface';
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
  faEdit = faEdit;
  members: User[] = [];
  notMembers: User[] = [];
  phase: Phase = {};
  project: Project = {};
  abilitie: Abilitie = {};
  memberQualify : members = {};
  activeModal: boolean = false;
  qualify:number = 0;
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
        this.getNotMembers();
      }else{
        if(this.id && this.phaseId){
          this.getAbilitie(this.id);
          this.getPhase(this.phaseId)
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
      if(this.abilitie.members  && this.abilitie.members.length > 0 && this.members){
        this.notMembers = this.members.filter((member) => {
          if(this.abilitie.members){
            return !this.abilitie.members.find((abilitieMember) => {
              return abilitieMember.id_member === member._id;
            })
          }else{
            return true;
          }
        })
      }else{
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

    if(this.abilitie.members){
      let newMember: members

      newMember = {
        id_member: usr._id,
        name: usr.name,
        lastname: usr.last_name,
        notes:[],
        state: 'ACTIVE',

      }
      this.abilitie.members.push(newMember);
      this.abilitieService.updateAbilitie(this.abilitie).subscribe(() => {
        Swal.fire({
          title: '¡Hecho!',
          text: 'Se ha agregado el miembro a la abilidad',
          icon: 'success',
        }).then(() => {
          this.addOrListMembers();
          if(this.id){
            this.getAbilitie(this.id);
          }
        })
      });
    }
  }

  disabledMember(usr: members){
    if(this.abilitie.members){
      let index = this.abilitie.members.findIndex((member) => {
        return member.id_member === usr.id_member;
      });
      this.abilitie.members[index].state = 'INACTIVE';
      this.abilitieService.updateAbilitie(this.abilitie).subscribe(() => {
        Swal.fire({
          title: '¡Hecho!',
          text: 'Se ha desactivado el miembro de la abilidad',
          icon: 'success',
        }).then(() => {
          this.addOrListMembers();
          if(this.id){
            this.getAbilitie(this.id);
          }
        })
      });
    }
  }

  activeMember(usr: members){
    if(this.abilitie.members){
      let index = this.abilitie.members.findIndex((member) => {
        return member.id_member === usr.id_member;
      });
      this.abilitie.members[index].state = 'ACTIVE';
      this.abilitieService.updateAbilitie(this.abilitie).subscribe(() => {
        Swal.fire({
          title: '¡Hecho!',
          text: 'Se ha activado el miembro de la abilidad',
          icon: 'success',
        }).then(() => {
          this.addOrListMembers();
          if(this.id){
            this.getAbilitie(this.id);
          }
        })
      });
    }
  }

  showModal(usr: members){
    this.memberQualify = usr
    this.activeModal = true
  }

  qualifyMember(usr: members){
    console.log(this.phaseId)
    const fecha = new Date();
    if(this.phaseId){
      var note : notes ={
        note: this.qualify.toString(),
        date: fecha.toString(),
        phaseId: this.phaseId
      }

      if(usr.notes && usr.notes.length){

        let index = usr.notes.findIndex((note: notes) =>{
          return note.phaseId === this.phaseId
        })
        if(index != -1){
          usr.notes[index]= note
          this.saveQualify()
        }else{
          console.log('hola')
          usr.notes.push(note)
          this.saveQualify()
        }
      }else{
          let notes: notes[] = []
          notes.push(note)
          usr.notes = notes
          this.saveQualify()
      }
    }
  }

  saveQualify(){
    this.abilitieService.updateAbilitie(this.abilitie).subscribe(()=>{
      Swal.fire({
        title: '¡Hecho!',
        text: 'Se ha calificado al integrante exitosamente',
        icon: 'success',
      }).then(() => {
        this.activeModal = false;
        this.addOrListMembers();
        if(this.id){
          this.getAbilitie(this.id);
        }
      })
    })
  }

  formatLabel(value: number) {
    return Math.round(value);
  }

  getValue(event:any){
    this.qualify = event.value
  }
}
