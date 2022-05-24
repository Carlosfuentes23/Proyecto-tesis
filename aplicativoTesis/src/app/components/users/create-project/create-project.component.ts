import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectsService } from 'src/app/services/api/projects.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  user = JSON.parse(sessionStorage.getItem("USER")!);

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  skills: string[] = ['Programacion'];
  allSkills: string[] = ['Programacion', 'Diseño', 'Bases De Datos', 'UI/UX'];
  members: string[] = [];
  userId: string = this.user.user._id;

  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectsService,
    private router: Router) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));

    this.form = this.fb.group({
      nameProject: ['', Validators.required],
      endDate: ['', Validators.required],
      startDate: ['', Validators.required],
      organization: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  ngOnInit(): void {
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

  save() {
    this.members.push(this.userId);
    var project: Project = {
      name: this.form.value.nameProject,
      skills: this.skills,
      description: this.form.value.description,
      membersid: this.members,
      organization: this.form.value.organization,
      state: 'ACTIVE',
      start_date: new Date(this.form.value.startDate),
      end_date: new Date(this.form.value.endDate) ,
      leaderid: this.userId,
    }

    this.projectService.createProject(project).subscribe(
      () => {
        Swal.fire({
          title: 'Proyecto creado',
          text: 'El proyecto ha sido creado con exito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {

          this.router.navigate(['/user'])
        })
      }, (err) => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear el proyecto',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      });
  }
}
