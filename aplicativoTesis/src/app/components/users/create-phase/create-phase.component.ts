import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Phase } from 'src/app/interfaces/phase.interface';
import { PhasesService } from 'src/app/services/api/phases.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-phase',
  templateUrl: './create-phase.component.html',
  styleUrls: ['./create-phase.component.css']
})
export class CreatePhaseComponent implements OnInit {

  form: FormGroup;
  phase?: Phase;
  members: string[] =[]
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  skills: string[] = ['Programacion'];
  allSkills: string[] = ['Programacion', 'Diseño', 'Bases De Datos', 'UI/UX'];
  id: string | null;

  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;


  constructor(private fb: FormBuilder,
    private router: Router,
    private phaseService: PhasesService,
    private aRoute: ActivatedRoute) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
    this.form = this.fb.group({
      namePhase: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.form.controls['skill'].markAsTouched();
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
      this.members.push(this.id);
      this.phase = {
        name: this.form.value.namePhase,
        project_id: this.id,
        description: this.form.value.description,
        start_date: new Date(),
        end_date: new Date(),
        members_id: this.members,
        skills: this.skills,
        state: 'ACTIVE',
      }

      this.phaseService.createPhase(this.phase).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Fase Creada con exitosamente',
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
}
