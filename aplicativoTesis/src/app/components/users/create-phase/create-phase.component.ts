import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Abilitie } from 'src/app/interfaces/abilitie.interface';
import { Phase } from 'src/app/interfaces/phase.interface';
import { AbilitieService } from 'src/app/services/api/abilitie.service';
import { PhasesService } from 'src/app/services/api/phases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-phase',
  templateUrl: './create-phase.component.html',
  styleUrls: ['./create-phase.component.css']
})
export class CreatePhaseComponent implements OnInit {

  form: FormGroup;
  faPlus = faPlus;
  phase?: Phase;
  members: string[] =[]
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  skills: string[] = [];
  allSkills: string[] = [];
  id: string | null;
  abilitieList: Abilitie[] = [];

  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;


  constructor(private fb: FormBuilder,
    private router: Router,
    private phaseService: PhasesService,
    private abilitieService: AbilitieService,
    private aRoute: ActivatedRoute) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
    this.form = this.fb.group({
      namePhase: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      abilitie: [''],
      description: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    if(this.id){
      this.getAbilitesProject(this.id);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our skills
    if (value) {
      this.skills.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.skillCtrl.setValue(null);
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(skill => skill.toLowerCase().includes(filterValue));
  }

  createPhase() {
    if (this.id) {
      this.phase = {
        name: this.form.value.namePhase,
        projectid: this.id,
        description: this.form.value.description,
        start_date: new Date(),
        end_date: new Date(),
        membersid: this.members,
        abilitiesid: this.skills,
        state: 'ACTIVE',
      }

      this.phaseService.createPhase(this.phase).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Fase creada con exitosamente',
          text: this.form.value.namePhase,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        }).then((result) => {
          if (result.value) {
            this.router.navigate(["user/project/", this.id]);
          }
        });
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear la fase',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      });
    }
  }

  savePhase() {
    if(this.skills.length > 0){
      Swal.fire({
        title: '¿Estas seguro?',
        text: `¿Deseas guardar la fase?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.createPhase();
        }
      });
    }else{
      Swal.fire({
        title: '¿Estas seguro?',
        text: `¿Deseas guardar la fase sin habilidades?`,
        icon: 'question',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.createPhase();
        }
      });
    };
  }

  addAbilitie(abilitie: Abilitie) {
      Swal.fire({
        title: '¿Estas seguro?',
        text: `¿Deseas agregar a ${abilitie.name}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value && abilitie._id) {
          this.skills.push(abilitie._id);
          this.abilitieList = this.abilitieList.filter((item) => item._id !== abilitie._id);
        }
      });
  }



  getAbilitesProject(projectId: string) {
    this.abilitieService.getAbilitieByProjectId(projectId).subscribe((res: Abilitie[]) => {
      this.abilitieList = res;
    });
  }
}
