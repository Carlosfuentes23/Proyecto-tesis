import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { user } from 'src/app/interfaces/user.interface';
import { PasswordValidatorsDirective } from 'src/app/validators/password-validators.directive';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @ViewChild('passInput') passInput: ElementRef = {} as ElementRef;
  @ViewChild('passConfInput') passConfInput: ElementRef = {} as ElementRef;

  form: FormGroup = new FormGroup({});;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  skills: string[] = ['Programacion'];
  allSkills: string[] = ['Programacion', 'Diseño', 'Bases De Datos', 'UI/UX'];
  emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //patron letras 
  patternLetters = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
  //patron numeros
  patternNumbers = /^[0-9]+$/;
  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.patternLetters)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      lastName: ['', [Validators.required, Validators.pattern(this.patternLetters)]],
      tel: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern(this.patternNumbers)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators: PasswordValidatorsDirective.passwordMatchValidator
    })
  }


  ngOnInit(): void {
  }

  save() {
    var user: user = {
      name: this.form.value.name,
      last_name: this.form.value.lastName,
      email: this.form.value.email,
      telephone: this.form.value.tel,
      password: this.form.value.password,
      skills: this.skills,
    }
    console.log(user);
    this.authService.register(user).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Se ha registrado correctamente',
          confirmButtonText: 'Ok'
        })
        this.router.navigate(['/login'])
      })
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

  togglePasswordInputType() {
    this.passInput.nativeElement.type = this.passInput.nativeElement.type === 'password' ? 'text' : 'password';
  }

  toogleConfirmPasswordInputType() {
    this.passConfInput.nativeElement.type = this.passConfInput.nativeElement.type === 'password' ? 'text' : 'password';
  }
}