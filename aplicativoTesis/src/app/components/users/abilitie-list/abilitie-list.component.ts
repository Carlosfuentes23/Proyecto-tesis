import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Abilitie } from 'src/app/interfaces/abilitie.interface';
import { Phase } from 'src/app/interfaces/phase.interface';
import { AbilitieService } from 'src/app/services/api/abilitie.service';
import { PhasesService } from 'src/app/services/api/phases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abilitie-list',
  templateUrl: './abilitie-list.component.html',
  styleUrls: ['./abilitie-list.component.css']
})
export class AbilitieListComponent implements OnInit {

  usr = JSON.parse(sessionStorage.getItem('USER')!);
  id: string | null = '';
  phase: Phase = {};
  projecAbilities: Abilitie[] = [];

  constructor(
    private abilitieService: AbilitieService,
    private pahaseSevice: PhasesService,
    private ac: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.ac.snapshot.paramMap.get('id');
    if(this.id){
      this.getPhase(this.id);
    }
  }

  getPhase(stringId: string) {
    this.pahaseSevice.getPhase(stringId).subscribe((data : Phase) => {
      this.phase = data;
      if(this.phase.projectid){
        this.getAbilitieProject(this.phase.projectid);
      }
    })
  }

  getAbilitieProject(projectId: string) {
    this.abilitieService.getAbilitieByProjectId(projectId).subscribe((data : Abilitie[]) => {
      this.projecAbilities = data.filter((abilitie) => {
        if(abilitie._id){
          return !this.phase.abilitiesid?.includes(abilitie._id);
        }else{
          return false;
        }
      });
    })
  }

  addAbilitie(abilitie :Abilitie) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Deseas agregar a ${abilitie.name} a la fase?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed){
        if(this.phase._id && abilitie._id){
          this.phase.abilitiesid?.push(abilitie._id);
          this.pahaseSevice.updatePhase(this.phase, this.phase._id).subscribe(() => {
            Swal.fire('Actualizado', 'La habilidad se agrego correctamente', 'success');
            if(this.id){
              this.getPhase(this.id);
            }
          });
        }
      }
    });
  }

}
