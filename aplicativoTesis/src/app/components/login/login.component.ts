import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  ngOnInit(): void {
  }

  ingresar(){
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    if(usuario=="admin1" && password=="admin123"){
      this.router.navigate(['users/admin']);
    }else if (usuario=="leader1" && password=="leader123"){
      this.router.navigate(['users/leader']);
    }else if(usuario=="member1" && password=="member123"){
      this.router.navigate(['users/member']);
    }else{
      this.error();
      this.form.reset();
    }
  }

  error(){
    alert("Usuario o Contraseña invalido");
  }

}
