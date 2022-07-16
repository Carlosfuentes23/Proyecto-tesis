import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Abilitie, members } from 'src/app/interfaces/abilitie.interface';
import { User } from 'src/app/interfaces/user.interface';
import { Phase } from 'src/app/interfaces/phase.interface';
import { AbilitieService } from 'src/app/services/api/abilitie.service';
import { PhasesService } from 'src/app/services/api/phases.service';

@Component({
  selector: 'app-create-abilitie',
  templateUrl: './create-abilitie.component.html',
  styleUrls: ['./create-abilitie.component.css']
})
export class CreateAbilitieComponent implements OnInit {
  form: FormGroup;
  id?: string;
  abilitie: Abilitie ={};
  phase: Phase = {};
  phaseMembers: User[] = [];
  notMembers: members[] = [];

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
      }
    )
  }

  createAbilitie(pasheId :string) {    
    this.abilitie.name = this.form.value.name;
    this.abilitie.description = this.form.value.description;


    this.abilitieService.createAbilitie(pasheId, this.abilitie).subscribe(
      (abilitie: Abilitie) => {
        console.log(abilitie);
        this.router.navigate(['/abilities']);
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
        this.notMembers.push({
          id_member: member._id,
          name: member.name,
          lastname: member.last_name,
        });
      }
    })
    console.log(this.notMembers);
  }


}
