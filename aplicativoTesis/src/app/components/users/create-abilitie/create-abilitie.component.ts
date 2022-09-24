import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Abilitie, members } from 'src/app/interfaces/abilitie.interface';
import { User } from 'src/app/interfaces/user.interface';
import { Phase } from 'src/app/interfaces/phase.interface';
import { AbilitieService } from 'src/app/services/api/abilitie.service';
import { PhasesService } from 'src/app/services/api/phases.service';

import Swal from 'sweetalert2';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-abilitie',
  templateUrl: './create-abilitie.component.html',
  styleUrls: ['./create-abilitie.component.css']
})
export class CreateAbilitieComponent implements OnInit {
  form: FormGroup;
  id?: string;
  faPlus = faPlus;
  abilitie: Abilitie ={};
  phase: Phase = {};
  phaseMembers: User[] = [];
  notMembers: User[] = [];
  abilitieMembers: members[] = [];

  constructor( private aRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private phaseService: PhasesService,
    private abilitieService: AbilitieService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    if(this.id){
      this.getMembersPhase(this.id);
      this.getPhase(this.id);
    }
  }

  getPhase(pasheId: string) {
    this.phaseService.getPhase(pasheId).subscribe(
      (phase: Phase) => {
        this.phase = phase;
      }
    )
  }

  getMembersPhase(pasheId :string){
    this.phaseService.getPhaseMembers(pasheId).subscribe(
      (members: User[]) => {
        this.phaseMembers = members;
        this.membersNotIntoPhase(this.phaseMembers, this.abilitieMembers);
      }
    )
  }

  createAbilitie(pasheId :string) {
    this.abilitie.name = this.form.value.name;
    this.abilitie.description = this.form.value.description;
    this.abilitie.id_project = this.phase.projectid;
    this.abilitieService.createAbilitie(pasheId, this.abilitie).subscribe(
      () => {
        this.router.navigate(['user/phase/' + pasheId]);
      }
    )
  }

  membersNotIntoPhase(members:User[], abilitieMembers: members[]){
   //listar los miembros que no estan en la abilidad
    members.forEach(member => {
      let exist = false;
      abilitieMembers.forEach(abilitieMember => {
        if(member._id == abilitieMember.id_member){
          exist = true;
        }
      });
      if(!exist){
        this.notMembers.push(member);
      }
    })
  }


  addMember(member: User) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Deseas agregar a ${member.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.abilitieMembers.push({
          id_member: member._id,
          name: member.name,
          lastname: member.last_name,
          state: 'ACTIVE',
        });
        this.notMembers = this.notMembers.filter(notMember => notMember._id != member._id);
      }
    })
  }

  saveAbilitie(){
    if(this.abilitieMembers.length > 0){
      Swal.fire({
        title: '¿Estas seguro?',
        text: `¿Deseas guardar la habilidad?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.abilitie.members = this.abilitieMembers;
          if(this.id)
            this.createAbilitie(this.id);
        }
      });
    }else{
      Swal.fire({
        title: '¿Estas seguro?',
        text: `¿Deseas guardar la abilidad sin miembros?`,
        icon: 'question',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.abilitie.members = this.abilitieMembers;
          if(this.id)
            this.createAbilitie(this.id);
        }
      });
    }
  }
}
